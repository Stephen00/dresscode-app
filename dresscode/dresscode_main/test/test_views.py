from django.test import TestCase, Client, RequestFactory
from django.urls import resolve, reverse
from dresscode_main.views import *

class testViews(TestCase):
    def setup(self):
        self.client = Client()

    def test_home_view_status_200(self):
        response = self.client.get(reverse('home'))
        self.assertEquals(response.status_code, 200)

    def test_discover_articles_view_status_200(self):
        response = self.client.get(reverse('discover_articles'))
        self.assertEquals(response.status_code, 200)

    def test_discover_polls_view_status_200(self):
        response = self.client.get(reverse('discover_polls'))
        self.assertEquals(response.status_code, 200)

    def test_discover_quizzes_view_status_200(self):
        response = self.client.get(reverse('discover_quizzes'))
        self.assertEquals(response.status_code, 200)

    def test_discover_posts_view_status_200(self):
        response = self.client.get(reverse('discover_posts'))
        self.assertEquals(response.status_code, 200)

    def test_discover_posts_view_status_200(self):
        response = self.client.get(reverse('discover_posts'))
        self.assertEquals(response.status_code, 200)


