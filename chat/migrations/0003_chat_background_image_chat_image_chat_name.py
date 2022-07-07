# Generated by Django 4.0.5 on 2022-07-02 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_alter_message_chat'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='background_image',
            field=models.ImageField(blank=True, upload_to='static/images/%Y/%m/%d/'),
        ),
        migrations.AddField(
            model_name='chat',
            name='image',
            field=models.ImageField(blank=True, upload_to='static/images/%Y/%m/%d/'),
        ),
        migrations.AddField(
            model_name='chat',
            name='name',
            field=models.TextField(default='noname', max_length=50),
            preserve_default=False,
        ),
    ]