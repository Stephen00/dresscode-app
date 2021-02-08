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
        depth=1
        fields = ('pk', 'media', 'question', 'answer', 'mistake1', 'mistake2', 'mistake3', 'tags')


class QuizSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    
    class Meta:
        model = Quiz
        questions = QuizQuestionSerializer(many=True)
        depth=1
        fields = ('pk', 'title', 'questions', 'tags', 'slug',)
    
    def get_question(self, obj):
        return obj.questions.all()[0]


class PollSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    media = MediaSerializer()
    title = serializers.SerializerMethodField('get_question')
    
    class Meta:
        model = Poll
        depth=1
        fields = ('pk', 'title', 'question', 'media', 'answer1', 'answer2', 'answer3', 'answer4', 'vote1', 'vote2', 'vote3', 'vote4', 'slug', 'tags')
    
    def get_question(self, obj):
        return obj.question


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
            serializer  = QuizQuestionSerializer(value)
        elif isinstance(value, Article):
            serializer  = ArticleSerializer(value)
        elif isinstance(value, Poll):
            serializer  = PollSerializer(value)
        else:
            raise Exception('Unexpected type of content attached to Post.')
        return serializer.data

class PostSerializer(serializers.ModelSerializer):
    content = PostContentRelatedField(read_only='True')
    
    class Meta:
        model = Post
        fields = ('__all__')
