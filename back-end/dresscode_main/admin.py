from django.contrib import admin, messages
from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.utils.translation import ngettext
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from dresscode_main.models import *
from django.urls import reverse
from django.contrib.admin.options import get_content_type_for_model
from django.utils.html import format_html

admin.site.site_header = "Dresscode Admin"


# Helper function(s) start
def assign_author_to_post(obj, request):
    obj.save()
    try:
        post = Post.objects.get(object_id=obj.pk, content_type=get_content_type_for_model(obj))
        post.author = request.user
        post.save()
    except:
        pass


# Helper function(s) ends


class TagAdmin(admin.ModelAdmin):
    list_display = ('tag',)
    search_fields = ("tag",)

    # Individual Instance Visuals
    fieldsets = (
        ('Tags', {
            'fields': ('tag',),
        }),
    )


class QuizQuestionAdmin(admin.ModelAdmin):
    # External visuals
    list_display = ('question', 'answer', 'mistake1', 'mistake2', 'mistake3', 'tagged_as')
    search_fields = ('question', 'tags__tag',)
    list_filter = ('tags__tag',)

    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])

    # Individual Instance visuals
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
    
    filter_horizontal = ('tags',)


class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'has_questions', 'tagged_as', )
    list_filter = ('tags__tag',)
    search_fields = ('questions__question',)

    def has_questions(self, obj):
        return " / \n".join([qq.question for qq in obj.questions.all()])

    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])

    # Individual Instance visuals
    fieldsets = (
        ('Title', {
            'fields': ('title',),
        }),
        ('Questions', {
            'fields': ('questions',),
        }),
        ('Tags', {
            'fields': ('tags',),
        }),
    )
    actions = ['delete_selected_quiz']

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def delete_selected_quiz(self, request, queryset):
        for obj in queryset:
            CT = get_content_type_for_model(obj)
            p = Post.objects.get(content_type=CT, object_id=obj.pk)
            p.delete()
            obj.delete()
    
    filter_horizontal = ('tags', 'questions')

    # Override Model Save
    def save_model(self, request, obj, form, change):
        assign_author_to_post(obj, request)


class PollAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'tagged_as')
    search_fields = ('question',)
    list_filter = ('tags__tag',)

    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])

    # Individual Instance visuals
    fieldsets = (
        ('Question', {
            'fields': ('question',),
        }),
        ('Answers', {
            'fields': ('answer1', 'answer2', 'answer3', 'answer4', 'answer5'),
        }),
        ('Tags', {
            'fields': ('tags',),
        }),
    )
    actions = ['delete_selected_poll']

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def delete_selected_poll(self, request, queryset):
        for obj in queryset:
            CT = get_content_type_for_model(obj)
            p = Post.objects.get(content_type=CT, object_id=obj.pk)
            p.delete()
            obj.delete()
    
    filter_horizontal = ('tags',)

    # Override Model Save
    def save_model(self, request, obj, form, change):
        assign_author_to_post(obj, request)


class MediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'image',)
    
    def name(self, obj):
        if obj.image:
            return " ".join(str(obj.image).split(".")[:-1])
        return str("NULL")

    # Individual Instance visuals
    fieldsets = (
        ('Image', {
            'fields': ('image',),
        }),
    )


class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'media', 'tagged_as')
    search_fields = ('title', 'text')
    list_filter = ('tags__tag',)

    def tagged_as(self, obj):
        return " / \n".join([tag.tag for tag in obj.tags.all()])

        # Individual Instance visuals

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

    actions = ['delete_selected_article']

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def delete_selected_article(self, request, queryset):
        for obj in queryset:
            CT = get_content_type_for_model(obj)
            p = Post.objects.get(content_type=CT, object_id=obj.pk)
            p.delete()
            obj.delete()
    
    filter_horizontal = ('tags',)

    # Override Model Save
    def save_model(self, request, obj, form, change):
        assign_author_to_post(obj, request)


class PostAdmin(admin.ModelAdmin):
    list_display = (
        'content', 'view_content_link', 'author', 'description', 'created_at', 'updated_at', 'reaction1_counter',
        'reaction2_counter', 'reaction3_counter')
    exclude = ('content_type', 'object_id',)

    def view_content_link(self, obj):
        content_type = obj.content_type.name
        link = reverse("admin:dresscode_main_" + content_type + "_change", args=[obj.object_id])
        return format_html('<a href="%s">%s</a>' % (link, obj.content))

    view_content_link.short_description = 'Edit Content'

    def save_model(self, request, obj, form, change):
        if not obj.author:
            obj.author = request.user
        obj.save()


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'staff_group', 'is_staff',)
    actions = ['add_staff_status', 'remove_staff_status', 'add_admin_role', ]
    list_filter = ('groups', 'is_staff', 'is_superuser',)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, default=1)

    # action to add user(s) as a staff member
    def add_staff_status(self, request, queryset):
        updated = queryset.update(is_staff=True)
        self.message_user(request, ngettext(
            '%d user successfully added as staff.',
            '%d users were successfully added as staff.',
            updated
        ) % updated, messages.SUCCESS)

    add_staff_status.short_description = "Add staff status to selected user(s)"

    def remove_staff_status(self, request, queryset):
        if not request.user.is_superuser:
            messages.error(request, "Please contact a superuser to remove staff")
        if request.user in queryset:
            messages.error(request, "Cannot remove staff status from a SuperUser")
        else:
            updated = queryset.update(is_staff=False)
            self.message_user(request, ngettext(
                '%d user successfully removed as staff.',
                '%d users were successfully removed as staff.',
                updated
            ) % updated, messages.SUCCESS)
    remove_staff_status.short_description = "Remove staff status from selected user(s)"

    def staff_group(self, request):
        return ''.join([g.name for g in request.groups.all()]) if request.groups.count() else ''

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Media, MediaAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(QuizQuestion, QuizQuestionAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Poll, PollAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Post, PostAdmin)
