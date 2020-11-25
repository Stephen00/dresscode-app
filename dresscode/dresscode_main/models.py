import random

from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


# Create your models here.
class Tag(models.Model):
    tag = models.CharField(max_length=128)


class Media(models.Model):
    video = models.FileField()
    image = models.ImageField()


class QuizQuestion(models.Model):
    media = models.ForeignKey(Media, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    answer = models.TextField()
    other1 = models.TextField()
    other2 = models.TextField()
    other3 = models.TextField()
    tags = models.ManyToManyField(Tag)

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


class Quiz(models.Model):
    questions = models.ManyToManyField(QuizQuestion)
    tags = models.ManyToManyField(Tag)

    def get_tags(self):
        tags = self.tags
        for q in self.questions.all():
            tags = tags | q.tags
        return tags


class Poll(models.Model):
    media = models.ForeignKey(Media, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    answer1 = models.TextField()
    answer2 = models.TextField()
    answer3 = models.TextField()
    counter1 = models.IntegerField(default=0)
    counter2 = models.IntegerField(default=0)
    counter3 = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag)

    def vote_poll(self, answer):
        if self.answer1 == answer:
            self.counter1 += 1
        if self.answer2 == answer:
            self.counter2 += 1
        if self.answer3 == answer:
            self.counter3 += 1


class Article(models.Model):
    title = models.TextField()
    media1 = models.ForeignKey(Media, null=True, on_delete=models.SET_NULL)
    paragraph = models.TextField()
    tags = models.ManyToManyField(Tag)


class Post(models.Model):
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
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
