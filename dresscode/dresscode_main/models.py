import random
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from django.template.defaultfilters import slugify


# Create your models here.
class Tag(models.Model):
    tag = models.CharField(max_length=128)
    
    def __str__(self):
        return self.tag


class Media(models.Model):
    video = models.FileField()
    image = models.ImageField()


class QuizQuestion(models.Model):
    media = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    answers = models.JSONField()
    tags = models.ManyToManyField(Tag, blank=True)

    def get_randomised_answers(self):
        ans = [self.answer, self.other1, self.other2, self.other3]
        for i in range(10):
            x = random.randrange(len(ans))
            y = random.randrange(len(ans))
            ans[x], ans[y] = ans[y], ans[x]
            return ans[x], ans[y]

    def check_answer(self, guess):
        if guess == self.answer:
            return True
        else:
            return False
    
    def __str__(self):
        return self.question
            

class Quiz(models.Model):
    questions = models.ManyToManyField(QuizQuestion)
    tags = models.ManyToManyField(Tag, blank=True)
    slug=models.SlugField(unique=True)

    def get_tags(self):
        tags = self.tags
        for q in self.questions.all():
            tags = tags | q.tags
        return tags
        
    def save(self, *args, **kwargs):
        mk_post=True
        if self.id:
            mk_post=False
            self.slug=slugify(self.id)
        super(Quiz, self).save(*args, **kwargs)
        if mk_post==True:
            post = Post(content=self)
            post.save()
    
    def __str__(self):
        return "Quiz "+str(self.id)


class Poll(models.Model):
    media = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    answers = models.JSONField()
    tags = models.ManyToManyField(Tag, blank=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.question
    
    def vote_poll(self, answer):
        if self.answer1 == answer:
            self.counter1 += 1
        if self.answer2 == answer:
            self.counter2 += 1
        if self.answer3 == answer:
            self.counter3 += 1
            
    def save(self, *args, **kwargs):
        try:
            Poll    .objects.get(pk=self.id)
            mk_post=False
        except:
            mk_post=True
        if self.question:
            self.slug=slugify(self.question)
        super(Poll, self).save(*args, **kwargs)
        if mk_post==True:
            postpoll=Post(content=self)
            postpoll.save()


class Article(models.Model):
    title = models.TextField(unique=True)
    media = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    text = models.JSONField()
    tags = models.ManyToManyField(Tag, blank=True)
    slug=models.SlugField(unique=True)
    
    def save(self, *args, **kwargs):
        try:
            Article.objects.get(pk=self.id)
            mk_post=False
        except:
            mk_post=True
        if self.title:
            self.slug=slugify(self.title)
        super(Article, self).save(*args, **kwargs)
        if mk_post==True:
            postart=Post(content=self)
            postart.save()
    
    def __str__(self):
        return self.title


class Post(models.Model):
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    description = models.TextField(null=True)
    reaction1_counter = models.IntegerField(default=0)
    reaction2_counter = models.IntegerField(default=0)
    reaction3_counter = models.IntegerField(default=0)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')

    def post_type(self):
        return self.content_type.name

    def title(self):
        if self.content.question:
            return self.content.question
        else:
            return self.content.title

    def full_title(self):
        return self.post_type() + " : " + self.title()

    def react1(self):
        self.reaction1_counter += 1

    def react2(self):
        self.reaction2_counter += 1

    def react3(self):
        self.reaction3_counter += 1
