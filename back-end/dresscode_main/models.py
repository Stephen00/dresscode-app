import random
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from tinymce.models import HTMLField
from django.contrib.admin.options import get_content_type_for_model
from django.template.defaultfilters import slugify


# Create your models here.
class Tag(models.Model):
    tag = models.CharField(max_length=128)

    def __str__(self):
        return self.tag


class Media(models.Model):
    image = models.ImageField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Media"
        
    def __str__(self):
        if self.image:
            return "Media "+str(self.pk)+": Image:"+" ".join(str(self.image).split(".")[:-1])
        return str("Media "+str(self.pk)+": NULL")


class QuizQuestion(models.Model):
    media = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    answer = models.CharField(max_length=128)
    mistake1 = models.CharField(max_length=128)
    mistake2 = models.CharField(max_length=128, blank=True, null=True)
    mistake3 = models.CharField(max_length=128, blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)

    class Meta:
        verbose_name = "Quiz Question"
        verbose_name_plural = "Quiz Questions"

    def get_randomised_answers(self):
        ans = [self.answer, self.mistake1]
        if self.mistake2:
            ans.append(self.mistake2)
        if self.mistake3:
            ans.append(self.mistake3)
        for i in range(10):
            x = random.randrange(len(ans))
            y = random.randrange(len(ans))
            ans[x], ans[y] = ans[y], ans[x]
        return ans

    def check_answer(self, guess):
        if guess == self.answer:
            return True
        else:
            return False

    def __str__(self):
        return self.question


class Quiz(models.Model):
    media = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    title = models.CharField(default="Quiz", blank=True, null=True, max_length=128)
    questions = models.ManyToManyField(QuizQuestion)
    tags = models.ManyToManyField(Tag, blank=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Quizzes"

    def get_tags(self):
        tags = self.tags
        for q in self.questions.all():
            tags = tags or q.tags
        return tags

    def save(self, *args, **kwargs):
        if self.title == "Quiz":
            self.title = "Quiz " + str(Quiz.objects.count() + 1)
        
        CT = get_content_type_for_model(self)
        if len(Post.objects.filter(object_id=self.pk, content_type=CT))>0:
            mk_post = False
        else:
            mk_post = True
        super(Quiz, self).save(*args, **kwargs)
        if self.id:
            self.slug = slugify(self.id)
        if mk_post == True:
            post = Post(content=self)
            post.save()
        for q in self.questions.all():
            for tag in q.tags.all():
                if tag not in self.tags.all():
                    self.tags.add(tag)

    def __str__(self):
        if self.title:
            return self.title
        return "Quiz " + str(self.id)

class Poll(models.Model):
    question = models.TextField()
    answer1 = models.CharField(max_length=128, default="")
    answer2 = models.CharField(max_length=128, default="")
    answer3 = models.CharField(max_length=128, default="", blank=True, null=True)
    answer4 = models.CharField(max_length=128, default="", blank=True, null=True)
    answer5 = models.CharField(max_length=128, default="", blank=True, null=True)
    vote1 = models.IntegerField(default=0)
    vote2 = models.IntegerField(default=0)
    vote3 = models.IntegerField(default=None, blank=True, null=True)
    vote4 = models.IntegerField(default=None, blank=True, null=True)
    vote5 = models.IntegerField(default=None, blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.question

    def vote_poll(self, answer):
        if answer is None: #If request is sent without an answer value
            return None 
        if self.answer1 == answer:
            if self.vote1:
                self.vote1 += 1
            else:
                self.vote1=1
        elif self.answer2 == answer:
            if self.vote2:
                self.vote2 += 1
            else:
                self.vote2=1
        elif self.answer3 == answer:
            if self.vote3:
                self.vote3 += 1
            else:
                self.vote3=1
        elif self.answer4 == answer:
            if self.vote4:
                self.vote4 += 1
            else:
                self.vote4=1
        elif self.answer5 == answer:
            if self.vote5:
                self.vote5 += 1
            else:
                self.vote5=1

    def save(self, *args, **kwargs):    
        #Create slug
        if self.question: 
            self.slug = slugify(self.question)
                
        #Ensure that None is set to votes with no answers         
        if self.answer3:
            if self.vote3 is None:
                self.vote3 = 0
        else:
            self.vote3=None
 
        if self.answer4:
            if self.vote4 is None:
                self.vote4 = 0
        else:
            self.vote4=None
 
        if self.answer5:
            if self.vote5 is None:
                self.vote5 = 0
        else:
            self.vote5=None
        
        #Check if Post needs to be made
        CT = get_content_type_for_model(self)
        if len(Post.objects.filter(object_id=self.pk, content_type=CT))>0:
            mk_post = False
        else:
            mk_post = True
        #Save Poll object
        super(Poll, self).save(*args, **kwargs)
        if mk_post == True: #Create Post if necessary
            postpoll = Post(content=self)
            postpoll.save()


class Article(models.Model):
    title = models.CharField(unique=True, max_length=256)
    media = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    text = HTMLField()
    tags = models.ManyToManyField(Tag, blank=True)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        CT = get_content_type_for_model(self)
        if len(Post.objects.filter(object_id=self.pk, content_type=CT))>0:
            mk_post = False
        else:
            mk_post = True
        if self.title:
            self.slug = slugify(self.title)
        super(Article, self).save(*args, **kwargs)
        if mk_post == True:
            postart = Post(content=self)
            postart.save()

    def __str__(self):
        return self.title


class Post(models.Model):
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    reaction1_counter = models.IntegerField(default=0)
    reaction2_counter = models.IntegerField(default=0)
    reaction3_counter = models.IntegerField(default=0)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def post_type(self):
        return self.content_type.name

    def title(self):
        if self.content.question:
            return self.content.question
        else:
            return self.content.title

    def full_title(self):
        return self.post_type() + " : " + self.title()

    def heart(self):
        self.reaction1_counter += 1

    def star(self):
        self.reaction2_counter += 1

    def share(self):
        self.reaction3_counter += 1
