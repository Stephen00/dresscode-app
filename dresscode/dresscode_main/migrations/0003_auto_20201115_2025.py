# Generated by Django 3.1.2 on 2020-11-15 20:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dresscode_main', '0002_auto_20201115_2010'),
    ]

    operations = [
        migrations.RenameField(
            model_name='quizquestion',
            old_name='media1',
            new_name='media',
        ),
    ]
