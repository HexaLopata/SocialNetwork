# Generated by Django 4.0.1 on 2022-01-28 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='background_picture',
            field=models.ImageField(blank=True, upload_to='static/images/%Y/%m/%d/'),
        ),
        migrations.AlterField(
            model_name='account',
            name='profile_picture',
            field=models.ImageField(blank=True, upload_to='static/images/%Y/%m/%d/'),
        ),
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]