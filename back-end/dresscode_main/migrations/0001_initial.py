# Generated by Django 3.1.3 on 2021-03-24 14:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
            ],
            options={
                'verbose_name_plural': 'Media',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('answer', models.CharField(max_length=128)),
                ('mistake1', models.CharField(max_length=128)),
                ('mistake2', models.CharField(blank=True, max_length=128, null=True)),
                ('mistake3', models.CharField(blank=True, max_length=128, null=True)),
                ('media', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dresscode_main.media')),
                ('tags', models.ManyToManyField(blank=True, to='dresscode_main.Tag')),
            ],
            options={
                'verbose_name': 'Quiz Question',
                'verbose_name_plural': 'Quiz Questions',
            },
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='Quiz', max_length=128, null=True)),
                ('slug', models.SlugField(unique=True)),
                ('media', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dresscode_main.media')),
                ('questions', models.ManyToManyField(to='dresscode_main.QuizQuestion')),
                ('tags', models.ManyToManyField(blank=True, to='dresscode_main.Tag')),
            ],
            options={
                'verbose_name_plural': 'Quizzes',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reaction1_counter', models.IntegerField(default=0)),
                ('reaction2_counter', models.IntegerField(default=0)),
                ('reaction3_counter', models.IntegerField(default=0)),
                ('object_id', models.PositiveIntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('answer1', models.CharField(default='', max_length=128)),
                ('answer2', models.CharField(default='', max_length=128)),
                ('answer3', models.CharField(blank=True, default='', max_length=128, null=True)),
                ('answer4', models.CharField(blank=True, default='', max_length=128, null=True)),
                ('answer5', models.CharField(blank=True, default='', max_length=128, null=True)),
                ('vote1', models.IntegerField(default=0)),
                ('vote2', models.IntegerField(default=0)),
                ('vote3', models.IntegerField(blank=True, default=None, null=True)),
                ('vote4', models.IntegerField(blank=True, default=None, null=True)),
                ('vote5', models.IntegerField(blank=True, default=None, null=True)),
                ('slug', models.SlugField(unique=True)),
                ('tags', models.ManyToManyField(blank=True, to='dresscode_main.Tag')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, unique=True)),
                ('text', tinymce.models.HTMLField()),
                ('slug', models.SlugField(unique=True)),
                ('media', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dresscode_main.media')),
                ('tags', models.ManyToManyField(blank=True, to='dresscode_main.Tag')),
            ],
        ),
    ]