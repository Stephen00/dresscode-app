from django.db import models

# Create your models here.
class Tags(models.Model):
    tag=models.CharField(max_length=128)

class QuizQuestions(models.Model):
    question=models.TextField()
    answer=models.TextField()
    other1=models.TextField()
    other2=models.TextField()
    other3=models.TextField()

class Quizzes(models.Model):
    questions=models.ManyToManyField(QuizQuestions)
    tags=models.ManyToManyField(Tags)