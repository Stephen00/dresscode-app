from django.contrib.auth.models import User
from django.test import TestCase
from dresscode.urls import *
from django.urls import resolve, reverse
from dresscode_main.views import *
from django.contrib.auth import login

class TestUrls(TestCase):

    def test_home(self):
        path = reverse('home')
        self.assertEqual(home, resolve(path).func)

    def test_discover_articles(self):
        path = reverse('discover_articles')
        self.assertEqual(discover_articles, resolve(path).func)

    def test_discover_polls(self):
        path = reverse('discover_polls')
        self.assertEqual(discover_polls, resolve(path).func)

    def test_discover_posts(self):
        path = reverse('discover_posts')
        self.assertEqual(discover_posts, resolve(path).func)

    def test_discover_quizzes(self):
        path = reverse('discover_quizzes')
        self.assertEqual(discover_quizzes, resolve(path).func)

    def test_api_tags(self):
        path = reverse('api_tags')
        self.assertEqual(get_all_tags, resolve(path).func)


