from django.contrib import admin
from django.http import HttpResponseRedirect
from django.shortcuts import render
from dresscode_main.models import *
from django import forms


class TagAdmin(admin.ModelAdmin):
    list_display=('tag',)

class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'answers', 'tagged_as')

    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])
        
class QuizAdmin(admin.ModelAdmin):
    list_display=('has_questions', 'tagged_as')
    
    def has_questions(self, obj):
        return " / \n".join([qq.question for qq in obj.questions.all()])
    
    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])
    
class PollAdmin(admin.ModelAdmin):
    list_display=('question', 'answers', 'media', 'tagged_as')
    
    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])

class MediaAdmin(admin.ModelAdmin):
    list_display=('video', 'image')
    
class ArticleAdmin(admin.ModelAdmin):
    list_display=('title', 'text', 'media', 'tagged_as')
    
    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()]) 

class PostAdmin(admin.ModelAdmin):
    list_display=('author', 'description', 'content', 'content_type', 'reaction1_counter', 'reaction2_counter', 'reaction3_counter',)
    
admin.site.register(Media, MediaAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(QuizQuestion, QuizQuestionAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Poll, PollAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Post, PostAdmin)
