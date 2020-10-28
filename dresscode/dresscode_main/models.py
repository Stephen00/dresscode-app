from django.db import models


# Create your models here.
class Tags(models.Model):
    tag = models.CharField(max_length=128)


class QuizQuestions(models.Model):
    question = models.TextField()
    answer = models.TextField()
    other1 = models.TextField()
    other2 = models.TextField()
    other3 = models.TextField()


class Quizzes(models.Model):
    questions = models.ManyToManyField(QuizQuestions)
    tags = models.ManyToManyField(Tags)


class Poll(models.Model):
    question = models.ManyToManyField(QuizQuestions)
    answer1 = models.TextField()
    answer2 = models.TextField()
    answer = models.TextField()
    tags = models.ManyToManyField(Tags)


class Media(models.Model):
    video = models.FileField()
    image = models.ImageField()

class Article(models.Model):
    title = models.TextField()
    media1 = models.ForeignKey(Article, on_delete=models.SET_NULL)
    paragraph = models.TextField()
    tags = models.ManyToManyField(Tags)
    