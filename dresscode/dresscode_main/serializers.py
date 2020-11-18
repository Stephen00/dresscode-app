from rest_framework import serializers
from models import Quiz, QuizQuestion, Post, Tag, Article, Media

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media 
        fields = ('pk', 'video', 'image')
        
class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media 
        fields = ('pk', 'media', 'question', 'other1', 'other2', 'other3', 'tags')
        
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media 
        fields = ('pk', 'questions', 'tags')
        
class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media 
        fields = ('pk', 'question', 'media', 'answer1', 'answer2', 'answer3', 'counter1', 'counter2', 'counter3',)
        
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media 
        fields = ('pk', 'tag')
       
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media 
        fields = ('pk', 'title', 'media1', 'paragraph', 'tags')
        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media 
        fields = ('pk', 'author', 'description', 'reaction1_counter', 'reaction2_counter', 'reaction3_counter', 'content', 'content_type', 'object_id', 'tags')