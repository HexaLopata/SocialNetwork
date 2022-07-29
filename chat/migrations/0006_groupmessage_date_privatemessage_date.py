# Generated by Django 4.0.5 on 2022-07-27 21:04

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_alter_groupchat_image_alter_groupmessage_author_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupmessage',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='privatemessage',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]