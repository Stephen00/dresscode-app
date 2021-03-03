import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dresscode.settings')

import django

django.setup()

from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from dresscode_main.models import Tag, Media, Quiz, QuizQuestion, Poll, Article, Post


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
temp = os.path.join(BASE_DIR, 'temp.jpg')


def main():
    if User.objects.filter(username='bob').exists():
        User.objects.all().delete()
        Tag.objects.all().delete()
        Media.objects.all().delete()
        Quiz.objects.all().delete()
        QuizQuestion.objects.all().delete()
        Poll.objects.all().delete()
        Article.objects.all().delete()
        Post.objects.all().delete()
        ContentType.objects.all().delete()
        print("Table cleaned")

    ### Create users
    user1 = User.objects.create_user(username='bob', password='1234', email="bob@dresscode.com", first_name="Bob",
                                     last_name="Smith")
    user2 = User.objects.create_user(username='linda', password='1234', email="linda@dresscode.com", first_name="Linda",
                                     last_name="Bateman")
    user3 = User.objects.create_user(username='jack', password='1234', email="jack@dresscode.com", first_name="Jack",
                                     last_name="Smith")
    user4 = User.objects.create_user(username='peter', password='1234', email="peter@dresscode.com", first_name="Peter",
                                     last_name="Parker")
    user5 = User.objects.create_user(username='melinda', password='1234', email="melinda@dresscode.com",
                                     first_name="Melinda", last_name="Stevenson")
    user1.save()
    user2.save()
    user3.save()
    user4.save()
    user5.save()
    print("Users made")
    
    post_enabled_models=['Quiz', 'Poll', 'Article']
    for m in post_enabled_models:
        c=ContentType.objects.get_or_create(app_label='dresscode_main', model=m)[0]
        c.save()
    print("ContentType mades")
    
    ##Creating tags
    tags=['Java','Databases','C','Python','Algorithms','Sigma16','Deep Neural Networks','WebApp','Game Dev','Back-End','Front-End','Threading','Django','AJAX','React','SQL','Functional Programming','Machine Learning','C++']
    #Here we create the tags
    for t in tags:
        tag=Tag(tag=t)
        tag.save()
    # Here we grab tags we're going to use later on to qualify other items
    java_tag=Tag.objects.get(tag="Java")
    c_tag=Tag.objects.get(tag="C")
    python_tag=Tag.objects.get(tag="Python")

    ### Create Articles
    articles = [
        {'title': "Why Java is awesome",
         'text': '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean quis leo in orci laoreet ullamcorper at nec lectus. Nam sit amet tristique sem. Mauris dignissim eros dignissim, suscipit tellus id, ornare dui. Nullam ac varius nibh. Ut ac molestie metus, eu scelerisque lacus. Maecenas velit quam, interdum quis tempus id, feugiat eu ex. In eget dui a turpis maximus cursus. Nulla congue non lectus quis sagittis. Morbi non pretium lacus. </p>',
         'media': None, 'tags': [java_tag]},
        {'title': "Why Python is cool",
         'text': '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean quis leo in orci laoreet ullamcorper at nec lectus. Nam sit amet tristique sem. Mauris dignissim eros dignissim, suscipit tellus id, ornare dui. Nullam ac varius nibh. Ut ac molestie metus, eu scelerisque lacus. </p> <p> Maecenas velit quam, interdum quis tempus id, feugiat eu ex. In eget dui a turpis maximus cursus. Nulla congue non lectus quis sagittis. Morbi non pretium lacus. </p>',
         'media': None, 'tags': [python_tag]},
        {'title': "Why C is incredible",
         'text': '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean quis leo in orci laoreet ullamcorper at nec lectus. Nam sit amet tristique sem. Mauris dignissim eros dignissim, suscipit tellus id, ornare dui. Nullam ac varius nibh. Ut ac molestie metus, eu scelerisque lacus. Maecenas velit quam, interdum quis tempus id, feugiat eu ex. <\p> <p> In eget dui a turpis maximus cursus. Nulla congue non lectus quis sagittis. Morbi non pretium lacus. <\p>',
         'media': None, 'tags': [c_tag]},
        {'title': "Why JavaScript is amazing",
         'text': '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. <\p> <p> Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean quis leo in orci laoreet ullamcorper at nec lectus. Nam sit amet tristique sem. Mauris dignissim eros dignissim, suscipit tellus id, ornare dui. Nullam ac varius nibh. Ut ac molestie metus, eu scelerisque lacus. Maecenas velit quam, interdum quis tempus id, feugiat eu ex. In eget dui a turpis maximus cursus. Nulla congue non lectus quis sagittis. Morbi non pretium lacus. <\p>',
         'media': None, 'tags': []},
        {'title': "Why C++ is terrific",
         'text': '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. <\p> <p> Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean quis leo in orci laoreet ullamcorper at nec lectus. Nam sit amet tristique sem. Mauris dignissim eros dignissim, suscipit tellus id, ornare dui. Nullam ac varius nibh. Ut ac molestie metus, eu scelerisque lacus. Maecenas velit quam, interdum quis tempus id, feugiat eu ex. In eget dui a turpis maximus cursus. Nulla congue non lectus quis sagittis. Morbi non pretium lacus. <\p>',
         'media': None, 'tags': []},
    ]

    for article in articles:
        a = Article(title=article['title'], text=article['text'])
        a.save()
        for tag in article['tags']:
            a.tags.add(tag)
        a.save()
    print("Articles made")

    polls = [
        {'media': None, 'question': "What is your favourite programming language?", 
         'answer1': 'Python', 'answer2': "Java", 'answer3': "C++", 'vote1': 7, 'vote2': 9, 'vote3': 11, 
         'tags':[]},
        {'media': None, 'question': "What is your least favourite programming language?", 
         'answer1': 'AJAX', 'answer2': "JavaScript", 'answer3': "Sigma16", 'vote1': 32, 'vote2': 19, 'vote3': 21,
         'tags':[]},
        {'media': None, 'question': "Should children learn coding in primary school?",
         'answer1': 'Yes, definitely', 'answer2': "Yes, but just the basics", 'answer3': "No.", 'vote1': 92, 'vote2': 119, 'vote3': 11,
         'tags':[]},
        {'media': None, 'question': "OOP, declarative programming or functional programming?",
         'answer1': 'OOP', 'answer2': "Declarative Programming", 'answer3': "Functional Programming", 'vote1': 1, 'vote2': 1, 'vote3': 1,
         'tags':[]},
        {'media': None, 'question': "Empty Poll?",
         'answer1': 'Option A', 'answer2': "Option B", 'answer3': "Option C", 'vote1': 0, 'vote2': 0, 'vote3': 0,
         'tags':[]}
    ]

    for poll in polls:
        p = Poll.objects.get_or_create(media=poll['media'], question=poll['question'], answer1=poll['answer1'], answer2=poll['answer2'], answer3=poll['answer3'], vote1=poll['vote1'], vote2=poll['vote2'], vote3=poll['vote3'])[0]
        p.save()
        for tag in poll['tags']:
            p.tags.add(tag)
        p.save()
    print("Polls made")

    quiz_questions = [
        {'media': None, 'question': "What is the correct way to declare an integer variable equal to 1 in C#?",
        'answer': 'int var = 1;',
        'mistake1': 'var = 1',
        'mistake2': 'int var =1',
        'mistake3': 'int var == 1;',
        'tags':[]},
        {'media': None, 'question': "When was C# released?",
        'answer': "1998",
        'mistake1': "1801",
        'mistake2': "2001",
        'mistake3': "2000",
        'tags':[]},
        {'media': None, 'question': "What is the correct structure to hold an array of strings in C#",
         'answer': "string []",
         'mistake1': "string {}",
         'mistake2': "str []",
         'mistake3': "str <>",
         'tags':[]},
    ]

    for qq in quiz_questions:
        q = QuizQuestion(media=qq['media'], question=qq['question'], answer=qq['answer'], mistake1=qq['mistake1'],
        mistake2=qq['mistake2'], mistake3=qq['mistake3'])
        q.save()
        for tag in qq['tags']:
            q.tags.add(tag)
        q.save()
    print("Quiz Questions made")
    
    q=Quiz()
    q.save()
    q.questions.add(QuizQuestion.objects.all()[0])
    q.questions.add(QuizQuestion.objects.all()[1])
    q.questions.add(QuizQuestion.objects.all()[2])
    q.save()
    print("Quiz Made")

if __name__ == '__main__':
    main()
