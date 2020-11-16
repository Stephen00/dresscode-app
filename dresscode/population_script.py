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
        Post.objects.all.delete()
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
         'paragraph': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean quis leo in orci laoreet ullamcorper at nec lectus. Nam sit amet tristique sem. Mauris dignissim eros dignissim, suscipit tellus id, ornare dui. Nullam ac varius nibh. Ut ac molestie metus, eu scelerisque lacus. Maecenas velit quam, interdum quis tempus id, feugiat eu ex. In eget dui a turpis maximus cursus. Nulla congue non lectus quis sagittis. Morbi non pretium lacus.",
         'media': None, 'tags': [java_tag]},
        {'title': "Why Python is awesome",
         'paragraph': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam faucibus vel mi vitae varius. Praesent at erat magna. Praesent condimentum imperdiet nisl at varius. Etiam quis arcu ligula. Aenean efficitur neque in ultrices rhoncus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse semper nisl vel tellus lobortis sollicitudin. Vestibulum vehicula massa eros, quis luctus enim rutrum sit amet. Aenean placerat turpis vel erat sodales pulvinar.",
         'media': None, 'tags': [python_tag]},
        {'title': "Why C is awesome",
         'paragraph': "Fusce vulputate, libero ac ornare elementum, urna mauris rhoncus neque, non sagittis nibh magna nec orci. Nunc mauris nunc, viverra a efficitur ut, dictum at eros. Sed imperdiet nisl turpis, a imperdiet lorem feugiat non. Aliquam viverra commodo purus, in fermentum nunc maximus eu. Integer rutrum tincidunt metus vel viverra. Nulla pellentesque purus ex, in luctus arcu hendrerit at. Praesent ac gravida nisi. Etiam risus nibh, ullamcorper sed erat vel, ultricies aliquam risus. Vivamus augue quam, accumsan ac suscipit eget, fringilla ac sem.",
         'media': None, 'tags': [c_tag]},
        {'title': "Why JavaScript is awesome",
         'paragraph': "Aliquam viverra nisi eu fringilla volutpat. Etiam eget dui sodales, consectetur metus sed, maximus est. Fusce porta tellus sed augue pretium fringilla. Aliquam mollis rhoncus posuere. In finibus nunc lorem, sit amet elementum dui tempus ac. Etiam volutpat maximus ligula, vitae eleifend dui hendrerit a. Maecenas augue ipsum, accumsan vel elementum ut, molestie eget risus. Vestibulum pharetra ligula ac nunc laoreet scelerisque. Aenean vel quam a tortor dictum elementum non congue dui. Mauris justo leo, convallis nec tellus eu, blandit sodales justo. Nunc laoreet sapien nec turpis finibus, et volutpat lacus condimentum. Nunc sed magna bibendum, feugiat enim quis, imperdiet odio. Integer consectetur mi et nisl tempus dictum. Praesent finibus mauris est, et condimentum magna eleifend eu. Aenean consequat maximus ante in venenatis.",
         'media': None, 'tags': []},
        {'title': "Why C++ is awesome",
         'paragraph': "Praesent eu rutrum lectus, sit amet tempor sem. Nam varius, risus at sodales consectetur, sapien magna suscipit metus, non congue orci purus a nibh. Nulla est sem, dictum non interdum et, luctus at lacus. Pellentesque sollicitudin congue rhoncus. Donec porta laoreet sollicitudin. Fusce lacinia eleifend arcu et eleifend. Aenean in tempus mi, ac mattis enim. Ut a facilisis orci. Nunc interdum lobortis lacus, at tristique nisl placerat sit amet. Nullam a mattis quam.",
         'media': None, 'tags': []},
    ]

    for article in articles:
        a = Article(title=article['title'], paragraph=article['paragraph'])
        a.save()
        for tag in article['tags']:
            a.tags.add(tag)
        a.save()
    print("Articles made")

    polls = [
        {'media': None, 'question': "What is your favourite programming language?", 'answer1': "Python",
         'answer2': "Java", 'answer3': "C++", 'counter1': 7, 'counter2': 9, 'counter3': 11, 'tags':[]},
        {'media': None, 'question': "What is your least favourite programming language?", 'answer1': "JavaScript",
         'answer2': "CSS", 'answer3': "AJAX", 'counter1': 3, 'counter2': 31, 'counter3': 18, 'tags':[]},
        {'media': None, 'question': "Should children learn coding in primary school?", 'answer1': "Yes, definetly",
         'answer2': "Yes, but just the basics", 'answer3': "No", 'counter2': 3, 'counter3': 31, 'counter1': 18, 'tags':[]}
    ]

    for poll in polls:
        p = Poll.objects.get_or_create(media=poll['media'], question=poll['question'], answer1=poll['answer1'],
                                       answer2=poll['answer2'], answer3=poll['answer3'], counter1=poll['counter1'],
                                       counter2=poll['counter2'], counter3=poll['counter3'])[0]
        p.save()
        for tag in poll['tags']:
            p.tags.add(tag)
        p.save()
    print("Polls made")

    quiz_questions = [
        {'media': None, 'question': "What is the correct way to declare an integer variable equal to 1 in C#",
         'answer': "int var = 1;", 'other1': "var = 1", 'other2': "int var =1", 'other3': "int var == 1;", 'tags':[]},
        {'media': None, 'question': "When was C# released", 'answer': "1998", 'other1': "1801", 'other2': "2001",
         'other3': "2000", 'tags':[]},
        {'media': None, 'question': "What is the correct structure to hold an array of strings in C#",
         'answer': "string []", 'other1': "string {}", 'other2': "str []", 'other3': "str <>", 'tags':[]},
    ]

    for qq in quiz_questions:
        q = QuizQuestion(media=qq['media'], question=qq['question'], answer=qq['answer'],
                        other1=qq['other1'], other2=qq['other2'], other3=qq['other3'])
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
