from django.test import TestCase, Client, RequestFactory
from django.urls import resolve, reverse
from dresscode_main.views import *
from dresscode_main.models import *


class testViews(TestCase):
    def setup(self):
        self.client = Client()

    def test_home_view_status_200(self):
        response = self.client.get(reverse('home'))
        self.assertEquals(response.status_code, 200)

    def test_discover_articles_view_status_valid(self):
        response = self.client.get(reverse('discover_articles'))
        self.assertIn(response.status_code, [200, 204])

    def test_discover_articles_view_status_200(self):
        a = Article.objects.create(media=None, title="Why Java is awesome",
                                   text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem "
                                        "mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis "
                                        "diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. "
                                        "Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean "
                                        "quis leo in orci laoreet ullamcorper at nec lectus.")
        a.save()
        response = self.client.get(reverse('discover_articles'))
        self.assertEquals(response.status_code, 200)

    def test_discover_articles_view_status_204(self):
        response = self.client.get(reverse('discover_articles'))
        self.assertEquals(response.status_code, 204)

    def test_discover_polls_view_status_valid(self):
        response = self.client.get(reverse('discover_polls'))
        self.assertIn(response.status_code, [200, 204])

    def test_discover_quizzes_view_status_200(self):
        qq = QuizQuestion(question="AAAAAAA?", answer="BBBBBB", mistake1="CCCCCCC", mistake2="DDDDDDDD")
        qq.save()
        q = Quiz()
        q.save()
        q.questions.add(qq)
        response = self.client.get(reverse('discover_quizzes'))
        self.assertEquals(response.status_code, 200)

    def test_discover_quizzes_view_status_204(self):
        response = self.client.get(reverse('discover_quizzes'))
        self.assertEquals(response.status_code, 204)

    def test_discover_quizzes_view_status_valid(self):
        response = self.client.get(reverse('discover_quizzes'))
        self.assertIn(response.status_code, [200, 204])

    def test_discover_polls_view_status_200(self):
        p = Poll(question="C or Java?", answer1="C", answer2="Java")
        p.save()
        response = self.client.get(reverse('discover_polls'))
        self.assertEquals(response.status_code, 200)

    def test_discover_polls_view_status_204(self):
        response = self.client.get(reverse('discover_polls'))
        self.assertEquals(response.status_code, 204)

    def test_discover_posts_view_status_200(self):
        p=Poll(question="C or Java?", answer1="C", answer2="Java")
        p.save()
        response = self.client.get(reverse('discover_posts'))
        self.assertEquals(response.status_code, 200)

    def test_discover_posts_view_status_200(self):
        response = self.client.get(reverse('discover_posts'))
        self.assertEquals(response.status_code, 200)

    def test_custom_discover_article_view_status_200(self):
        a = Article.objects.create(media=None, title="Why Java is awesome",
                                   text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a sem "
                                        "mattis, consequat mi quis, vulputate felis. Phasellus vitae lobortis "
                                        "diam. Proin dapibus est sapien, eget bibendum lacus vehicula at. "
                                        "Maecenas nisl diam, placerat vel quam in, interdum maximus arcu. Aenean "
                                        "quis leo in orci laoreet ullamcorper at nec lectus.")
        a.save()
        response = self.client.get('/discover/articles/'+a.slug, follow=True)
        self.assertEquals(response.status_code, 200)

    def test_custom_discover_poll_view_status_200(self):
        p = Poll.objects.create(media=None, question="What is your favourite programming language?",
                                answer1='Python', answer2="Java", answer3="C++", vote1=7,
                                vote2=9, vote3=11)
        p.save()
        response = self.client.get('/discover/polls/' + p.slug, follow=True)
        self.assertEquals(response.status_code, 200)

