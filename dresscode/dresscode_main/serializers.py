from rest_framework import serializers
from .models import Quiz, QuizQuestion, Post, Tag, Article, Media, Poll
from django.contrib.admin.options import get_content_type_for_model
import random

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ('pk', 'image', 'video')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('tag',) 

class PollSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    title = serializers.SerializerMethodField('get_question')
    
    class Meta:
        model = Poll
        depth=1
        fields = ('pk', 'title', 'question', 'media', 'answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'vote1', 'vote2', 'vote3', 'vote4', 'vote5', 'slug', 'tags')
    
    def get_question(self, obj):
        return obj.question

class ArticleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    media = MediaSerializer()
        
    class Meta:
        model = Article
        depth=1
        fields = ('pk', 'title', 'media', 'text', 'tags', 'slug')
  


class QuizQuestionSerializer(serializers.ModelSerializer):
    tags=TagSerializer(many=True)
    answers = serializers.SerializerMethodField('get_answers')
    
    class Meta:
        model = QuizQuestion 
        fields= ('pk', 'question', 'answers', 'tags',)
        
    def get_answers(self, obj):
        return obj.get_randomised_answers()

class QuizSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    questions = QuizQuestionSerializer(many=True)
    media = MediaSerializer()
    
    class Meta:
        model = Quiz
        depth=1
        fields = ('pk', 'media', 'title', 'questions', 'tags', 'slug',)



class PostContentRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `content_object` generic relationship in post.
    """
    def to_representation(self, value):
        """
        Serialize content objects to a simple textual representation.
        """
        if isinstance(value, Quiz):
            serializer  = QuizSerializer(value)
        elif isinstance(value, QuizQuestion):
            serializer  = QuizQuestionSerializer(value)
        elif isinstance(value, Article):
            serializer  = ArticleSerializer(value)
        elif isinstance(value, Poll):
            serializer  = PollSerializer(value)
        else:
            raise Exception('Unexpected type of content attached to Post.')
        return serializer.data
        
class PostContentTypeRelatedField(serializers.RelatedField):
    """
    A custom field to determine content_types.
    """
    def to_representation(self, value):
        if value.model == 'quiz':
            return 'quizzes'
        return value.model+'s' #Content_Type instance is passed in so we can return CT.model
        
class PostAuthorRelatedField(serializers.RelatedField):
    """
    A custom field to determine authors.
    """
    def to_representation(self, value):
        try:
            return value.first_name+" "+value.last_name
        except:
            return None

class PostSerializer(serializers.ModelSerializer):
    content = PostContentRelatedField(read_only='True')
    content_type = PostContentTypeRelatedField(read_only='True')
    author = PostAuthorRelatedField(read_only='True')
    
    class Meta:
        model = Post
        fields = ('__all__')
