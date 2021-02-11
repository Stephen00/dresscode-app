import random
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from tinymce.models import HTMLField

from django.template.defaultfilters import slugify


# Create your models here.
class Tag(models.Model):
    tag = models.CharField(max_length=128)

    def __str__(self):
        return self.tag


class Media(models.Model):
    video = models.FileField()
    image = models.ImageField()

    class Meta:
        verbose_name_plural = "Media"


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
        ans = [self.answer, self.mistake1, self.mistake2, self.mistake3]
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
    title = models.CharField(default="Quiz", blank=True, null=True, max_length=128)
    questions = models.ManyToManyField(QuizQuestion)
    tags = models.ManyToManyField(Tag, blank=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Quizzes"

    def get_tags(self):
        tags = self.tags
        for q in self.questions.all():
            tags = tags | q.tags
        return tags

    def save(self, *args, **kwargs):
        mk_post = True
        if self.title == "Quiz":
            self.title = "Quiz " + str(Quiz.objects.count() + 1)
        if self.id:
            mk_post = False
            self.slug = slugify(self.id)
        super(Quiz, self).save(*args, **kwargs)
        if mk_post == True:
            post = Post(content=self)
            post.save()

    def __str__(self):
        return "Quiz " + str(self.id)


class Poll(models.Model):
    media = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    answer1 = models.CharField(max_length=128)
    answer2 = models.CharField(max_length=128, blank=True, null=True)
    answer3 = models.CharField(max_length=128, blank=True, null=True)
    answer4 = models.CharField(max_length=128, blank=True, null=True)
    vote1 = models.IntegerField(default=0)
    vote2 = models.IntegerField(default=0)
    vote3 = models.IntegerField(default=0)
    vote4 = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.question

    def vote_poll(self, answer):
        if self.answer1 == answer:
            self.vote1 += 1
        if self.answer2 == answer:
            self.vote2 += 1
        if self.answer3 == answer:
            self.vote3 += 1

    def save(self, *args, **kwargs):
        try:
            Poll.objects.get(pk=self.id)
            mk_post = False
        except:
            mk_post = True
        if self.question:
            self.slug = slugify(self.question)
        super(Poll, self).save(*args, **kwargs)
        if mk_post == True:
            postpoll = Post(content=self)
            postpoll.save()


class Article(models.Model):
    title = models.CharField(unique=True, max_length=256)
    media = models.ForeignKey(Media, blank=True, null=True, on_delete=models.SET_NULL)
    text = HTMLField()
    tags = models.ManyToManyField(Tag, blank=True)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        try:
            Article.objects.get(pk=self.id)
            mk_post = False
        except:
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
    description = models.TextField(null=True, blank=True)
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
