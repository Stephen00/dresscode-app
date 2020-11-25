from django.test import TestCase
from dresscode_main.models import Poll, Article, Tag, QuizQuestion, Post
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


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
        java_tag = Tag.objects.get(tag="Java")
        c_tag = Tag.objects.get(tag="C")
        python_tag = Tag.objects.get(tag="Python")

        # Create test poll
        p = Poll.objects.create(media=None, question="What is your favourite programming language?", answer1="Python",
                                answer2="Java", answer3="C++", counter1=7, counter2=9, counter3=11)
        p.save()

        # Create test articles
        a = Article.objects.create(media1=None, title="Why Java is awesome",
                                   paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean quis leo in orci laoreet ullamcorper at nec lectus.")
        a.save()

        # Create test  quiz question
        qq = QuizQuestion.objects.create(media=None,
                                         question="What is the correct way to declare an integer variable equal to 1 in C#",
                                         answer="int var = 1;", other1="var = 1", other2="int var =1",
                                         other3="int var ==1;")
        qq.save()





    # Test Cases here
    def testPollQuestion(self):
        test_poll = Poll.objects.all()[0]
        self.assertEquals(test_poll.question, "What is your favourite programming language?")

    def testPollReaction(self):
        test_poll = Poll.objects.all()[0]
        test_poll.vote_poll("Python")  # Increment each poll vote by one
        test_poll.vote_poll("Java")
        test_poll.vote_poll("C++")
        self.assertEquals(test_poll.counter1, 8)
        self.assertEquals(test_poll.counter2, 10)
        self.assertEquals(test_poll.counter3, 12)

    def testPollAnswer(self):
        test_poll = Poll.objects.all()[0]
        self.assertEquals(test_poll.answer1, "Python")

    def testArticleTitle(self):
        test_article = Article.objects.all()[0]
        self.assertEquals(test_article.title, "Why Java is awesome")

    def testArticleParagraph(self):
        test_article = Article.objects.all()[0]
        self.assertEquals(test_article.paragraph, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem "
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
        self.assertEquals(test_question.answer, "int var = 1;")
        self.assertEquals(test_question.check_answer("an incorrect answer"), False)

    def testRandomizedAnswers(self):
        test_question = QuizQuestion.objects.all()[0]
        question_matched = False

        while not question_matched:
            rnd1, rnd2 = test_question.get_randomised_answers()
            if rnd1 == test_question.answer:
                rnd1 = True
                self.assertEquals(rnd1, True)
                question_matched = True
            elif rnd2 == test_question.answer:
                rnd2 = True
                self.assertEquals(rnd2, True)
                question_matched = True


