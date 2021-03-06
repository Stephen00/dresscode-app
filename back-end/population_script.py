import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dresscode.settings')

import django

django.setup()

from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from dresscode_main.models import Tag, Media, Quiz, QuizQuestion, Poll, Article, Post
from django.contrib.admin.options import get_content_type_for_model

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
temp = 'stick-man.png'
java_pic = 'java_logo.jpg'
python_pic = 'python_logo.png'
c_pic = 'c_logo.png'
c_plus_pic = 'c_plus_logo.jpg'
dcode_pic = 'dresscode_logo.jpg'


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
    
    #Create Media
    media1=Media(image=temp)
    media1.save()
    java_logo_media=Media(image=java_pic)
    java_logo_media.save()
    python_logo_media=Media(image=python_pic)
    python_logo_media.save()
    c_logo_media=Media(image=c_pic)
    c_logo_media.save()
    c_plus_logo_media=Media(image=c_plus_pic)
    c_plus_logo_media.save()
    dcode_media=Media(image=dcode_pic)
    dcode_media.save()
    print("Media Created")
    
    post_enabled_models=['Quiz', 'Poll', 'Article']
    cts=[]
    for m in post_enabled_models:
        c=ContentType.objects.get_or_create(app_label='dresscode_main', model=m)[0]
        c.save()
        cts.append(c)
    print("ContentTypes made")
    
    ##Creating tags
    tags=['Java','Databases','C','Python','Algorithms','Sigma16','Deep Neural Networks','WebApp','Game Dev','Back-End','Front-End','Threading','Django','AJAX','React','SQL','Functional Programming', 'Object Oriented Programming', 'Declarative Programming', 'Machine Learning','C++']
    #Here we create the tags
    for t in tags:
        tag=Tag(tag=t)
        tag.save()
    # Here we grab tags we're going to use later on to qualify other items
    java_tag=Tag.objects.get(tag="Java")
    c_tag=Tag.objects.get(tag="C")
    python_tag=Tag.objects.get(tag="Python")
    func_tag=Tag.objects.get(tag="Functional Programming")
    oop_tag=Tag.objects.get(tag="Object Oriented Programming")
    dec_tag=Tag.objects.get(tag="Declarative Programming")
    sql_tag=Tag.objects.get(tag="SQL")
    webapp_tag=Tag.objects.get(tag="WebApp")
    alg_tag=Tag.objects.get(tag="Algorithms")
    
    ### Create Articles
    articles = [
        {'title': "Why Java is awesome",
         'text': '<p> Java is an Object Oriented Programming (OOP) language. It is a high-level, statically typed programming language. It is very commonly used in industry for applications that rely in the idea of objects interacting with each other. It is compiled and executed in the Java Virtual Machine which allows for a high distribution of code created for Java.',
         'media': java_logo_media, 'tags': [java_tag, oop_tag]},
        {'title': "Why Python is cool",
         'text': 'Python is a high level language. It can be procedurally and functionally programmed but can also be Object Oriented if necessary. It is dynamically typed and a very forgiving language for starter programmers. It is very commonly used in industry for Data Science and Data Analysis.',
         'media': python_logo_media, 'tags': [python_tag, oop_tag, func_tag]},
        {'title': "Why C is incredible",
         'text': 'C is a functional programming language. It is very hard and can be very complicated, given that it is one of the most basic languages upon which other languages and frameworks have been built. However this makes it very reliable for basic stuff that must follow rigid conditions, such as networks. Many network frameworks are built on top of C. C is also a magnificent language to familiarise yourself with how the computer actually works at a deeper level.',
         'media': c_logo_media, 'tags': [c_tag, func_tag]},
        {'title': "Why C++ is terrific",
         'text': 'C++ could be considered an extension to C. C was determined too difficult and overly complicated and C++ adds some new features newer programming languages have, to keep it in the running, as well as abstractions to make it easier to do.',
         'media': c_plus_logo_media, 'tags': [c_tag]},
        {'title': "Procedural Programming",
         'text': 'Procedural Programming is a type of programming which relies on the declaration and implementation of functions which when executed carry out a process.',
         'media': dcode_media, 'tags': []},
        {'title': "Declarative Programming",
         'text': 'Declarative Programming is a non-imperative type of programming. We do not tell the language what to do, instead we tell the language what we want and the language decides the best way to give us that.',
         'media': dcode_media, 'tags': [dec_tag]},
        {'title': "Object Oriented Programming",
         'text': 'Object Oriented Programming relies on the idea of declaring objects which interact with each other. Then we can create many instances of these objects and have them interact with each other. Videogames work like this, your characters and enemies are instances of a particular object.',
         'media': dcode_media, 'tags': [oop_tag]},
    ]

    for article in articles:
        a = Article(title=article['title'], text=article['text'], media=article['media'])
        a.save()
        for tag in article['tags']:
            a.tags.add(tag)
        a.save()
    print("Articles made")

    polls = [
        {'question': "What is your favourite programming language?", 
         'answer1': 'Python', 'answer2': "Java", 'answer3': "C++", 'vote1': 7, 'vote2': 9, 'vote3': 11, 
         'tags':[]},
        {'question': "What is your least favourite programming language?", 
         'answer1': 'AJAX', 'answer2': "JavaScript", 'answer3': "Sigma16", 'vote1': 32, 'vote2': 19, 'vote3': 21,
         'tags':[]},
        {'question': "Should children learn coding in primary school?",
         'answer1': 'Yes, definitely', 'answer2': "Yes, but just the basics", 'answer3': "No.", 'vote1': 92, 'vote2': 119, 'vote3': 11,
         'tags':[]},
        {'question': "OOP, Declarative, or functional programming?",
         'answer1': 'OOP', 'answer2': "Declarative Programming", 'answer3': "Functional Programming", 'vote1': 1, 'vote2': 1, 'vote3': 1,
         'tags':[]},
        {'question': "What is your favourite Operating System?",
         'answer1': 'Linux', 'answer2': "Mac IOS", 'answer3': "Windows", 'vote1': 0, 'vote2': 0, 'vote3': 0,
         'tags':[]}
    ]

    for poll in polls:
        p = Poll.objects.get_or_create(question=poll['question'], answer1=poll['answer1'], answer2=poll['answer2'], answer3=poll['answer3'], vote1=poll['vote1'], vote2=poll['vote2'], vote3=poll['vote3'])[0]
        p.save()
        for tag in poll['tags']:
            p.tags.add(tag)
        p.save()
    print("Polls made")
    
    #Add users to Posts
    p=Post.objects.all()[0]
    p.author=user1
    p.save()
    p=Post.objects.all()[1]
    p.author=user2
    p.save()
    p=Post.objects.all()[2]
    p.author=user3
    p.save()
    p=Post.objects.all()[3]
    p.author=user4
    p.save()
    p=Post.objects.all()[4]
    p.author=user5
    p.save()
    print("Authors Set")
    
    quiz_questions = [
        {'media': None, 'question': "What is the correct way to declare an integer variable equal to 1 in C#?",
        'answer': 'int var = 1;',
        'mistake1': 'var = 1',
        'mistake2': 'int var =1',
        'mistake3': 'int var == 1;',
        'tags':[c_tag]},
        {'media': None, 'question': "When was C# released?",
        'answer': "1998",
        'mistake1': "1801",
        'mistake2': "2001",
        'mistake3': "2000",
        'tags':[c_tag]},
        {'media': None, 'question': "You are making a videogame. You are planning the parts in which different objects interact with each other, for this purpose, which programming language would be better?",
         'answer': "Java",
         'mistake1': "MySQL",
         'tags':[java_tag, sql_tag]},
         
        {'media': None, 'question': "Is Python dynamically or statically typed?",
         'answer': "Dynamically",
         'mistake1': "Statically",
         'tags':[python_tag]},
        {'media': None, 'question': "How do you add something to the end of a list (a=[]) in python?",
         'answer': "a.append(value)",
         'mistake1': "a.put_value(value)",
         'mistake2': "a.insert(value, 0)",
         'mistake3': "a.put(value)",
         'tags':[python_tag]},
        {'media': None, 'question': "For which of the following areas of Computer Science is Python best suited?",
         'answer': "Data Analysis",
         'mistake1': "Videogame Creation",
         'mistake2': "Object Oriented Programming",
         'mistake3': "Embedded Microcontrollers",
         'tags':[python_tag]},
        
        {'media': None, 'question': "Imagine a list has n values. Which sort is based on iterating through the list n times, and swapping each value with the value to its right, if it is bigger than that value? ",
         'answer': "Bubble Sort, increasing order",
         'mistake1': "Bubble Sort, decreasing order",
         'mistake2': "Merge Sort, increasing order",
         'mistake3': "Merge Sort, decreasing order",
         'mistake4': "Insertion Sort",
         'tags':[alg_tag]},
        {'media': None, 'question': "What is the fetch execute cycle?",
        'answer': 'The process through which the computer executes a program',
        'mistake1': 'An app like Uber Eats',
        'mistake2': 'An exercise routine',
        'mistake3': 'A process used to load a pendrive and its drivers',
        'tags':[c_tag]},
        {'media': None, 'question': "Which printer is capable of building full structures",
        'answer': '3D Printer',
        'mistake1': 'Laser printer',
        'mistake2': 'Inkjet Printer',
        'tags':[c_tag]},
        {'media': None, 'question': "Out of the different programming language paradigms, which one is non-imperative?",
         'answer': "Declarative Programming",
         'mistake1': "Functional Programming",
         'mistake2': "Procedural Programming",
         'mistake3': "Object Oriented Programming",
         'tags':[dec_tag, func_tag, oop_tag]},
        {'media': None, 'question': "In a WebApp application which part of the system is in charge of communicating with the database",
         'answer': "Back-end",
         'mistake1': "Front-end",
         'tags':[webapp_tag]},
        {'media': None, 'question': "Is programming a skill accessible to everyone?",
        'answer': 'Yes!',
        'mistake1': 'No',
        'tags':[]},
    ]
    

    for qq in quiz_questions:
        q = QuizQuestion(media=qq['media'], question=qq['question'], answer=qq['answer'], mistake1=qq['mistake1'],
        mistake2=qq.get('mistake2'), mistake3=qq.get('mistake3'))
        q.save()
        for tag in qq['tags']:
            q.tags.add(tag)
        q.save()
    print("Quiz Questions made")
    
    q=Quiz(title="Programming Languages", media=dcode_media)
    q.save()
    all_questions=QuizQuestion.objects.all()
    q.questions.add(all_questions[0])
    q.questions.add(all_questions[1])
    q.questions.add(all_questions[2])
    q.questions.add(all_questions[3])
    q.questions.add(all_questions[4])
    q.questions.add(all_questions[5])
    q.save()
    p=Post.objects.get(content_type__model='quiz', object_id=q.pk)
    p.author=user1
    p.save()
    print("Programming Languages Quiz Created")
    
    q=Quiz(title="Python is fun!", media=dcode_media)
    q.save()
    all_questions=QuizQuestion.objects.all()
    q.questions.add(all_questions[3])
    q.questions.add(all_questions[4])
    q.questions.add(all_questions[5])
    q.save()
    p=Post.objects.get(content_type__model='quiz', object_id=q.pk)
    p.author=user1
    p.save()
    print("Python is fun! Quiz Made")
    
    q=Quiz(title="Mixer Questions", media=dcode_media)
    q.save()
    all_questions=QuizQuestion.objects.all()
    for qq in all_questions:
        q.questions.add(qq)
    q.save()
    p=Post.objects.get(content_type__model='quiz', object_id=q.pk)
    p.author=user1
    p.save()
    print("Mixer Questions Quiz Made")
    
if __name__ == '__main__':
    main()
