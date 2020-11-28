from rest_framework import serializers
from .models import Quiz, QuizQuestion, Post, Tag, Article, Media, Poll

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media 
        fields = ('pk', 'video', 'image')
        
class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion 
        fields = ('pk', 'media', 'question', 'other1', 'other2', 'other3', 'tags')
        
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz 
        fields = ('pk', 'questions', 'tags', 'slug')
        
class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll 
        fields = ('pk', 'question', 'media', 'answer1', 'answer2', 'answer3', 'counter1', 'counter2', 'counter3', 'slug')
        
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag 
        fields = ('pk', 'tag')
       
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article 
        fields = ('pk', 'title', 'media1', 'paragraph', 'tags', 'slug')
        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ('pk', 'author', 'description', 'reaction1_counter', 'reaction2_counter', 'reaction3_counter', 'content', 'content_type', 'object_id', 'tags')