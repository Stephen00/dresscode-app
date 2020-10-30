from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey

# Create your models here.
class Tags(models.Model):
    tag = models.CharField(max_length=128)

class Media(models.Model):
    video = models.FileField()
    image = models.ImageField()

class QuizQuestions(models.Model):
    media1 = models.ForeignKey(Media, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    answer = models.TextField()
    other1 = models.TextField()
    other2 = models.TextField()
    other3 = models.TextField()
    

class Quizzes(models.Model):
    questions = models.ManyToManyField(QuizQuestions)
    tags = models.ManyToManyField(Tags)


class Poll(models.Model):
    media1 = models.ForeignKey(Media, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    answer1 = models.TextField()
    answer2 = models.TextField()
    answer = models.TextField()
    tags = models.ManyToManyField(Tags)


class Article(models.Model):
    title = models.TextField()
    media1 = models.ForeignKey(Media, null=True, on_delete=models.SET_NULL)
    paragraph = models.TextField()
    tags = models.ManyToManyField(Tags)
    
    
class Post(models.Model):
    author=models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    description=models.TextField()
    reaction1_counter=models.IntegerField()
    reaction2_counter=models.IntegerField()
    reaction3_counter=models.IntegerField()
    content_type=models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id=models.PositiveIntegerField()
    content=GenericForeignKey('content_type', 'object_id')
    
    def post_type(self):
        return self.content_type.name
        
    def title(self):
        if self.content.question:
            return self.content.question
        else:
            return self.content.title
            
    def full_title(self):
        return self.post_type()+" : "+self.title()