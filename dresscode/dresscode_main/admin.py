from django.contrib import admin
from django.http import HttpResponseRedirect
from django.shortcuts import render
from dresscode_main.models import *
from django import forms
from dresscode import settings
from django.urls import reverse
from django.utils.http import urlencode

from django.contrib.admin.options import get_content_type_for_model
from django.utils.html import format_html

admin.site.site_header = "Dresscode Admin"


class TagAdmin(admin.ModelAdmin):
    list_display=('tag',)
    search_fields = ("tag", )
    
    #Individual Instance Visuals
    fieldsets=(
        ('Tags', {
            'fields': ('tags',),
        }),
    )


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
        }),
        ('Answer', {
            'fields': ('answer',),
        }),
        ('Mistakes', {
            'fields': ('mistake1',),
        }),
        (None, {
            'fields': ('mistake2',),
        }),
        (None, {
            'fields': ('mistake3',),
        }),
        ('Tags', {
            'fields': ('tags',),
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
    
    #Individual Instance visuals
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
    
    ##Individual Instance visuals
    fieldsets = (
        ('Question', {
            'fields': ('question',),
        }),
        ('Answers', {
            'fields': ('answer1', 'answer2', 'answer3', 'answer4'),
        }),
        ('Tags', {
            'fields': ('tags',),
        }),
    )

class MediaAdmin(admin.ModelAdmin):
    list_display=('video', 'image')
    
    #Individual Instance visuals
    fieldsets = (
        ('Image', {
            'fields': ('image',),
        }),
        ('Video', {
            'fields': ('video',),
        }),
    )
    
class ArticleAdmin(admin.ModelAdmin):
    list_display=('title', 'media', 'tagged_as')
    search_fields = ('title', 'text')
    list_filter = ('tags__tag', )
    
    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()]) 
    
    #Individual Instance visuals
    fieldsets = (
        ('Title', {
            'fields': ('title',),
        }),
        ('Text', {
            'fields': ('text',),
        }),
        ('Media', {
            'fields': ('media',),
        }),
        ('Tags', {
            'fields': ('tags',),
        }),
    )
    
    #Post connection to save
    def save_model(self, request, obj, form, change): 
        obj.save()
        try:
            post=Post.objects.get(object_id=obj.pk, content_type=get_content_type_for_model(obj))
            post.author=request.user
            post.save()
        except:
            pass
            
            
class PostAdmin(admin.ModelAdmin):
    list_display=('content', 'view_content_link', 'author', 'description', 'created_at', 'updated_at', 'reaction1_counter', 'reaction2_counter', 'reaction3_counter')
    exclude=('content_type', 'object_id',)
    
    def view_content_link(self, obj):
        content_type=obj.content_type.name
        link=reverse("admin:dresscode_main_"+content_type+"_change", args=[obj.object_id])
        return format_html('<a href="%s">%s</a>' % (link,obj.content))
    view_content_link.short_description = 'Edit Content'
    
    
    def save_model(self, request, obj, form, change): 
        if not obj.author:
            obj.author = request.user
            obj.save()
    
admin.site.register(Media, MediaAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(QuizQuestion, QuizQuestionAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Poll, PollAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Post, PostAdmin)
