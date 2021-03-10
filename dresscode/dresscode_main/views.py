from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import redirect, get_object_or_404
from django.contrib import messages

from .serializers import *

# For each post get the get the object and its content type
# Apply the appropriate serializer to convert into a neat JSON format
# Return the serialized content, otherwise return a 204 or 404 error


@api_view(['GET'])
def home(request):
    if request.method == 'GET':
        try:
            post = Post.objects.all().order_by('-created_at')
            serializer = PostSerializer(post, context={'request': request}, many=True)
            return Response(serializer.data)
        except:
            return Response("no posts found", status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_custom_article(request, article_slug):
    if request.method == 'GET':
        try:
            article = Article.objects.get(slug=article_slug)
            CT = get_content_type_for_model(article)
            post = Post.objects.filter(object_id=article.pk, content_type=CT)[0]
            serializer = PostSerializer(post, context={'request': request})
            return Response(serializer.data)
        except:
            return Response("Article " + article_slug + " doesn't exist", status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_custom_quiz(request, quiz_slug):
    if request.method == 'GET':
        try:
            quiz = Quiz.objects.get(slug=quiz_slug)
            CT = get_content_type_for_model(quiz)
            post = Post.objects.filter(object_id=quiz.pk, content_type=CT)[0]
            serializer = PostSerializer(post, context={'request': request})
            return Response(serializer.data)
        except:
            return Response("Quiz " + quiz_slug + " doesn't exist", status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_custom_poll(request, poll_slug):
    if request.method == 'GET':
        try:
            poll = Poll.objects.get(slug=poll_slug)
            CT = get_content_type_for_model(poll)
            post = Post.objects.filter(object_id=poll.pk, content_type=CT)[0]
            serializer = PostSerializer(post, context={'request': request})
            return Response(serializer.data)
        except:
            return Response("Poll " + poll_slug + " doesn't exist", status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def get_all_tags(request):
    if request.method == 'GET':
        data = Tag.objects.all()

        serializer = TagSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def discover_quizzes(request):
    if request.method == 'GET':
        try:
            CT = get_content_type_for_model(Quiz.objects.first())
            data = Post.objects.filter(content_type=CT)
            serializer = PostSerializer(data, context={'request': request}, many=True)
            return Response(serializer.data)
        except:
            return Response("No quizzes found", status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'POST':
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET',])
def discover_polls(request):
    if request.method == 'GET':
        try:
            CT = get_content_type_for_model(Poll.objects.first())
            data = Post.objects.filter(content_type=CT)
            serializer = PostSerializer(data, context={'request': request}, many=True)
            return Response(serializer.data)
        except:
            return Response("No polls found", status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def discover_articles(request):
    if request.method == 'GET':
        try:
            CT = get_content_type_for_model(Article.objects.first())
            data = Post.objects.filter(content_type=CT)
            serializer = PostSerializer(data, context={'request': request}, many=True)
            return Response(serializer.data)
        except:
            return Response("no quiz found", status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def discover_posts(request):
    if request.method == 'GET':
        data = Post.objects.all()
        try:
            Post.objects.first()
        except:
            return Response("no posts found", status=status.HTTP_204_NO_CONTENT)

        serializer = PostSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def add_heart_reaction(request):
    if request.method == 'POST':
        data=request.data
        post = get_object_or_404(Post, id=data['postId'])
        post.heart()
        post.save()
        return Response(status=status.HTTP_200_OK)

# Add reactions to the designated post by obtaining the object's slug
@api_view(['POST'])
def add_star_reaction(request):
    if request.method == 'POST':
        data=request.data
        post = get_object_or_404(Post, id=data['postId'])
        post.star()
        post.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def add_share_reaction(request):
    if request.method == 'POST':
        data=request.data
        post = get_object_or_404(Post, id=data['postId'])
        post.share()
        post.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def add_poll_vote(request):
    if request.method == 'POST':
        data=request.data
        poll = get_object_or_404(Poll, id=data['pollId'])
        poll.vote_poll(data['selectedAnswer'])
        poll.save()
        return Response(status=status.HTTP_200_OK)
    


# needs more work:
@api_view(['GET', 'POST'])
def answer_quiz(request, slug):
    if request.method == 'POST':
        quiz = get_object_or_404(Quiz, slug=slug)
        questions = quiz.questions.all()  # might need to pass pk of some sort here or in next line
        for question in questions:
            guess = "C#"  # place holder; not sure how to get guess
            if question.check_answer(guess):
                quiz.score()  # need to update models to include way to evaluate quiz
        quiz.save()
        msg = "Quiz result: " + quiz.score.get()
        messages.info(request, msg)
        return redirect("discover/quizzes/", slug=slug)
