from rest_framework import serializers
from .models import Quiz, QuizQuestion, Post, Tag, Article, Media, Poll


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ('pk', 'video', 'image')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('pk', 'tag')


class QuizQuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    media = MediaSerializer()
    
    class Meta:
        model = QuizQuestion
        media = MediaSerializer()
        tags = TagSerializer(many=True, read_only=True)
        fields = ('pk', 'media', 'question', 'answers', 'tags')


class QuizSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    class Meta:
        model = Quiz
        questions = QuizQuestionSerializer(many=True)
        depth=1
        fields = ('pk', 'questions', 'tags', 'slug')


class PollSerializer(serializers.ModelSerializer):
    media = MediaSerializer()
    class Meta:
        model = Poll
        fields = ('pk', 'question', 'media', 'answers', 'slug', 'tags')


class ArticleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    media = MediaSerializer()
        
    class Meta:
        model = Article
        depth=1
        fields = ('pk', 'title', 'media', 'text', 'tags', 'slug')


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
            serializer  = QuizQuestionSerializer()
        elif isinstance(value, Article):
            serializer  = ArticleSerializer(value)
        elif isinstance(value, Poll):
            serializer  = PollSerializer()
        else:
            raise Exception('Unexpected type of content attached to Post.')
        return serializer.data

class PostSerializer(serializers.ModelSerializer):
    content = PostContentRelatedField(read_only='True')
    
    class Meta:
        model = Post
        fields = (
            'pk', 'author', 'description', 'reaction1_counter', 'reaction2_counter', 'reaction3_counter', 'content',
            'content_type', 'object_id')
