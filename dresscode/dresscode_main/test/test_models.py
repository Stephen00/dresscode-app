from django.contrib.auth.models import User
from django.test import TestCase
from dresscode_main.models import Poll, Article, Tag, QuizQuestion, Quiz, Post
from django.contrib.contenttypes.models import ContentType


# Create initial test data
class testAttributes(TestCase):

    def setUp(self):
        tag = Tag(tag='C')
        tag.save()

        # Create tasks to be used in test data
        c_tag = Tag.objects.get(tag="C")

        # Create test poll
        p = Poll.objects.create(media=None, question="What is your favourite programming language?",
                                answer1 = 'Python', answer2 = "Java", answer3 = "C++", vote1 = 7,
                                         vote2 = 9, vote3 = 11)
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
                                         answer="int var = 1;", mistake1="var = 1", mistake2="int var =1",
                                         mistake3="int var ==1;")
        qq.tags.set([c_tag])
        qq.save()

        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='12345')

        # Create test post
        post = Post(author=self.user, description="This is a test post, here is some text", reaction1_counter=10,
                    reaction2_counter=12, reaction3_counter=4, object_id=p.pk,
                    content_type=ContentType.objects.get_or_create(app_label='dresscode_main', model='Poll')[0])
        post.save()

        # Create test Quiz/Post
        quiz = Quiz.objects.create()
        quiz.tags.set([c_tag])
        quiz.questions.add(QuizQuestion.objects.all()[0])
        quiz.save()
        quiz.get_tags()

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
        self.assertEquals(test_poll.vote1, 8)
        self.assertEquals(test_poll.vote2, 10)
        self.assertEquals(test_poll.vote3, 12)

    def testPollAnswer(self):
        test_poll = Poll.objects.all()[0]
        self.assertEquals(test_poll.answer1, "Python")

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

    def testPostType(self):
        test_post = Post.objects.all()[0]
        post_c = test_post.post_type()
        title = test_post.title()
        full_title = test_post.full_title()
        self.assertEquals(post_c, "poll")
        self.assertEquals(title, "What is your favourite programming language?")
        self.assertEquals(full_title, "poll : What is your favourite programming language?")

    def testQuizType(self):
        test_post = Post.objects.all()[3]
        qq_c = test_post.post_type()
        self.assertEquals(qq_c, 'quiz')

    def testPostReact(self):
        test_post = Post.objects.all()[2]
        test_post.heart()
        test_post.star()
        test_post.share()
        tot = test_post.reaction1_counter + test_post.reaction2_counter + test_post.reaction3_counter
        self.assertEquals(tot, 29)
