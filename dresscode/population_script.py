import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dresscode.settings')

import django
django.setup()

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
from django.core.files.base import ContentFile

from core.models import Tags, Media, Quiz, QuizQuestion, Poll, Article, Post

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
temp=os.path.join(BASE_DIR, 'temp.jpg')

def main():
    if User.objects.filter(username='bob').exists():
        User.objects.all().delete()
        Tags.objects.all().delete()
        Media.objects.all().delete()
        Quiz.objects.all().delete()
        QuizQuestion.objects.all().delete()
        Poll.objects.all().delete()
        Article.objects.all().delete()

    ### Create users
    user1 = User.objects.create_user(username='bob', password='1234', email="bob@dresscode.com", first_name="Bob", last_name="Smith")
    user2 = User.objects.create_user(username='linda', password='1234', email="linda@dresscode.com", first_name="Linda", last_name="Bateman")
    user3 = User.objects.create_user(username='jack', password='1234', email="jack@dresscode.com", first_name="Jack", last_name="Smith")
    user4 = User.objects.create_user(username='peter', password='1234', email="peter@dresscode.com", first_name="Peter", last_name="Parker")
    user5 = User.objects.create_user(username='melinda', password='1234', email="melinda@dresscode.com", first_name="Melinda", last_name="Stevenson")
    user1.save()
    user2.save()
    user3.save()
    user4.save()
    user5.save()
    print("Users made")
    
    ### Create Articles
    articles = [
        {'title': "Why Java is awesome", 'paragraph': "", 'media': "", 'tags': []},
        {'title': "Why Python is awesome", 'paragraph': "", 'media': "", 'tags': []},
        {'title': "Why C is awesome", 'paragraph': "", 'media': "", 'tags': []},
        {'title': "Why JavaScript is awesome", 'paragraph': "", 'media': "", 'tags': []},
        {'title': "Why C++ is awesome", 'paragraph': "", 'media': "", 'tags': []},
    ]

    for article in articles:
        a=Article(title=article['title'], paragraph=article['paragraph'], media=article['media'], tags=article['tags'])
        a.save()
        ### Create products
    
    polls = [
        {'media': "", 'question': "What is your favourite programming language?", 'answer1': "Python", 'answer2': "Java", 'answer3': "C++", 'counter1': 7, 'counter1': 9, 'counter1': 11 },
        {'media': "", 'question': "What is your least favourite programming language?", 'answer1': "JavaScript", 'answer2': "CSS", 'answer3': "AJAX", 'counter1': 3, 'counter1': 31, 'counter1': 18 }
    ]

    for poll in polls:
        p=Poll.objects.get_or_create(media=poll['media'], question=poll['question'], answer1=poll['answer1'], answer2=poll['answer2'], answer3=poll['answer3'], counter1=poll['counter1'], counter2=poll['counter2'], counter3=poll['counter3'])[0]
        p.save()
    print("Polls Made")

if __name__ == '__main__':
    main()
