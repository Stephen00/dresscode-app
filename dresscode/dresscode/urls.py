"""dresscode URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from dresscode_main import views

from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name="home"),
    path('admin/', admin.site.urls),
    path('discover/articles/', views.discover_articles, name="discover_articles"),
    path('discover/polls/', views.discover_polls, name="discover_polls"),
    path('discover/quizzes/', views.discover_quizzes, name="discover_quizzes"),
    path('discover/posts/', views.discover_posts, name="discover_posts"),
    path('discover/articles/<slug:article_slug>/', views.get_custom_article, name="custom_article"),
    path('discover/quizzes/<slug:quiz_slug>/', views.get_custom_quiz, name="custom_quiz"),
    path('discover/polls/<slug:poll_slug>/', views.get_custom_poll, name="custom_poll"),
    path('api/tags/', views.get_all_tags, name="api_tags"),
]
