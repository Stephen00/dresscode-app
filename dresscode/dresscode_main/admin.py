from django.contrib import admin
from django.http import HttpResponseRedirect
from django.shortcuts import render
from dresscode_main.models import *
from django import forms
from dresscode import settings

admin.site.site_header = "Dresscode Admin"


class TagAdmin(admin.ModelAdmin):
    list_display=('tag',)
    search_fields = ("tag", )


class QuizQuestionAdmin(admin.ModelAdmin):
    #External visuals
    list_display = ('question', 'answer', 'mistake1', 'mistake2', 'mistake3', 'tagged_as')
    search_fields = ('question', 'tags__tag',)
    list_filter = ('tags__tag', )
    
    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])
        
    #Individual Instance visuals
    fieldsets = (
        ('Question', {
            'fields': ('question',),
            'classes': ('question',)
        }),
        ('Answer', {
            'fields': ('answer',),
            'classes': ('answer',)
        }),
        ('Mistakes', {
            'fields': ('mistake1',),
            'classes': ('mistakes','mistake1',)
        }),
        (None, {
            'fields': ('mistake2',),
            'classes': ('mistakes','mistake2',)
        }),
        (None, {
            'fields': ('mistake3',),
            'classes': ('mistakes','mistake3',)
        }),
        ('Tags', {
            'fields': ('tags',),
            'classes': ('tags',)
        })
    )
    
    
class QuizAdmin(admin.ModelAdmin):
    list_display=('has_questions', 'tagged_as')
    list_filter = ('tags__tag', )
    search_fields = ('questions__question',)
    
    def has_questions(self, obj):
        return " / \n".join([qq.question for qq in obj.questions.all()])
    
    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])
    
    filter_horizontal = ('questions',)
    
    fieldsets = (
        ('Questions', {
            'fields': ('questions',),
        }),
        ('Tags', {
            'fields': ('tags',),
        }),
    )

class PollAdmin(admin.ModelAdmin):
    list_display=('question', 'answer1', 'answer2', 'answer3', 'answer4', 'media', 'tagged_as')
    search_fields = ('question',)
    list_filter = ('tags__tag', )
    
    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])


class MediaAdmin(admin.ModelAdmin):
    list_display=('video', 'image')

    
class ArticleAdmin(admin.ModelAdmin):
    list_display=('title', 'media', 'tagged_as')
    search_fields = ('title', 'text')
    list_filter = ('tags__tag', )
    
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
