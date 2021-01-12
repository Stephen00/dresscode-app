from django.test import TestCase
from dresscode_main.models import Poll, Article, Tag, QuizQuestion, Quiz, Post
from django.contrib.contenttypes.models import ContentType
from django.db import models

# Create initial test data
class testAttributes(TestCase):

    def setUp(self):
        # Initialise Tags
        tags = ['Java', 'Databases', 'C', 'Python', 'Algorithms', 'Sigma16', 'Deep Neural Networks', 'WebApp',
                'Game Dev', 'Back-End', 'Front-End', 'Threading', 'Django', 'AJAX', 'React', 'SQL',
                'Functional Programming', 'Machine Learning', 'C++']
        for t in tags:
            tag = Tag(tag=t)
            tag.save()

        # Create tasks to be used in test data
        c_tag = Tag.objects.get(tag="C")

        # Create test poll
        p = Poll.objects.create(media=None, question="What is your favourite programming language?", answers = {'answer1': 'Python', 'answer2': "Java", 'answer3': "C++", 'vote1': 7, 'vote2': 9, 'vote3': 11})

        p.save()

        # Create test articles
        a = Article.objects.create(media=None, title="Why Java is awesome",
                                   text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem "
                                             "mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis "
                                             "diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. "
                                             "Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean "
                                             "quis leo in orci laoreet ullamcorper at nec lectus.")
        a.save()

        # Create test quiz question
        qq = QuizQuestion.objects.create(media=None,
                                         question="What is the correct way to declare an integer variable equal to 1 in C#",
                                         answers= {"answer": "int var = 1;", "other1":"var = 1", "other2":"int var =1",
                                         "other3":"int var ==1;"})
        qq.tags.set([c_tag])
        qq.save()

        # Code below currently broken and doesn't work, unable to link a content type instance to the Post.content_type

        # # Create a content type instance
        # ct = ContentType.objects.get(app_label='dresscode', model='QuizQuestion')
        # ct_class = ct.model_class()
        # ct_instance = ct_class()
        # ct_instance.save()
        #
        # # Create test post
        # post = Post()
        # post.object_id = qq.pk
        # post.content_type = ct_instance
        # post.save()

    # Test Cases here
    def testPollQuestion(self):
        test_poll = Poll.objects.all()[0]
        self.assertEquals(test_poll.question, "What is your favourite p"
                                              "rogramming language?")

    def testPollReaction(self):
        test_poll = Poll.objects.all()[0]
        test_poll.vote_poll("Python")  # Increment each poll vote by one
        test_poll.vote_poll("Java")
        test_poll.vote_poll("C++")
        self.assertEquals(test_poll.answers["vote1"], 8)
        self.assertEquals(test_poll.answers["vote2"], 10)
        self.assertEquals(test_poll.answers["vote3"], 12)

    def testPollAnswer(self):
        test_poll = Poll.objects.all()[0]
        self.assertEquals(test_poll.answers["answer1"], "Python")

    def testArticleTitle(self):
        test_article = Article.objects.all()[0]
        self.assertEquals(test_article.title, "Why Java is awesome")

    def testArticleParagraph(self):
        test_article = Article.objects.all()[0]
        self.assertEquals(test_article.text, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem "
                                                  "mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis "
                                                  "diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. "
                                                  "Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. "
                                                  "Aenean quis leo in orci laoreet ullamcorper at nec lectus.")

    def testQuizQuestion(self):
        test_question = QuizQuestion.objects.all()[0]
        self.assertEquals(test_question.question,
                          "What is the correct way to declare an integer variable equal to 1 in C#")

    def testQuizQuestionAnswer(self):
        test_question = QuizQuestion.objects.all()[0]
        test_question.check_answer("int var = 1;")
        self.assertEquals(test_question.answers["answer"], "int var = 1;")
        self.assertEquals(test_question.check_answer("an incorrect answer"), False)

    def testRandomizedAnswers(self):
        test_question = QuizQuestion.objects.all()[0]
        question_matched = False

        while not question_matched:
            rnd1, rnd2 = test_question.get_randomised_answers()
            if rnd1 == test_question.answers["answer"]:
                rnd1 = True
                self.assertEquals(rnd1, True)
                question_matched = True
            elif rnd2 == test_question.answers["answer"]:
                rnd2 = True
                self.assertEquals(rnd2, True)
                question_matched = True
