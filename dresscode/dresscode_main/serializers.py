from rest_framework import serializers
from .models import Quiz, QuizQuestion, Post, Tag, Article, Media, Poll

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ('pk', 'video', 'image')

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        media = MediaSerializer()
        fields = ('pk', 'media', 'question', 'answers', 'tags')


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('pk', 'questions', 'tags', 'slug')


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        media = MediaSerializer()
        fields = ('pk', 'question', 'media', 'answers', 'slug')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('pk', 'tag')


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        media = MediaSerializer()
        fields = ('pk', 'title', 'media', 'text', 'tags', 'slug')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
        'pk', 'author', 'description', 'reaction1_counter', 'reaction2_counter', 'reaction3_counter', 'content',
        'content_type', 'object_id', 'tags')