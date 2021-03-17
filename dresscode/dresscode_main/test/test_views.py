from django.test import TestCase, Client
from django.urls import reverse

from dresscode_main.models import *


class TestViews(TestCase):

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

    def test_discover_articles_view_status_400(self):
        response = self.client.post(reverse('discover_articles'), data={'unknown_field': 'test_tag'})
        self.assertEquals(response.status_code, 400)

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

    def test_discover_quizzes_view_status_400(self):
        response = self.client.post(reverse('discover_quizzes'), args=(['random_path']))
        self.assertEquals(response.status_code, 400)

    def test_discover_polls_view_status_200(self):
        p = Poll(question="C or Java?", answer1="C", answer2="Java")
        p.save()
        response = self.client.get(reverse('discover_polls'))
        self.assertEquals(response.status_code, 200)

    def test_discover_polls_view_status_204(self):
        response = self.client.get(reverse('discover_polls'))
        self.assertEquals(response.status_code, 204)

    def test_discover_posts_view_status_200(self):
        p = Poll(question="C or Java?", answer1="C", answer2="Java")
        p.save()
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
        response = self.client.get('/discover/articles/' + a.slug, follow=True)
        self.assertEquals(response.status_code, 200)

    def test_custom_article_view_status_404(self):
        response = self.client.get(reverse('custom_article', args=(['random_path'])))
        self.assertEquals(response.status_code, 404)

    def test_custom_discover_poll_view_status_200(self):
        p = Poll.objects.create(question="What is your favourite programming language?",
                                answer1='Python', answer2="Java", answer3="C++", vote1=7,
                                vote2=9, vote3=11)
        p.save()
        response = self.client.get('/discover/polls/' + p.slug, follow=True)
        self.assertEquals(response.status_code, 200)

    def test_custom_poll_view_status_404(self):
        response = self.client.get(reverse('custom_poll', args=(['random_path'])))
        self.assertEquals(response.status_code, 404)

    def test_discover_polls_view_status_400(self):
        response = self.client.post(reverse('discover_polls'), data={'unknown_field': 'test_tag'})
        self.assertEquals(response.status_code, 405)

    def test_custom_quiz_view_status_200(self):
        qq = QuizQuestion.objects.create(media=None,
                                         question="What is the correct way to declare an integer variable equal to 1 in C#",
                                         answer="int var = 1;", mistake1="var = 1", mistake2="int var =1",
                                         mistake3="int var ==1;")
        qq.save()

        q = Quiz()
        q.save()
        q.questions.add(QuizQuestion.objects.all()[0])
        q.save()
        response = self.client.get(reverse('custom_quiz', args=(q.slug,)))
        self.assertEquals(response.status_code, 200)

    def test_custom_quiz_view_status_204(self):
        response = self.client.get(reverse('custom_quiz', args=(['random_path'])))
        self.assertEquals(response.status_code, 204)

    def test_custom_tags_view_status_200(self):
        response = self.client.get(reverse('api_tags'))
        self.assertEquals(response.status_code, 200)

    def test_custom_tags_view_status_201(self):
        response = self.client.post(reverse('api_tags'), data={'tag': 'test_tag'})
        self.assertEquals(response.status_code, 201)

    def test_discover_posts_view_status_400(self):
        response = self.client.post(reverse('discover_posts'), data={'unknown_field': 'test_tag'})
        self.assertEquals(response.status_code, 400)

