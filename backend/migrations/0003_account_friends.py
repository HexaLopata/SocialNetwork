# Generated by Django 4.0.1 on 2022-01-29 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_alter_account_background_picture_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='friends',
            field=models.ManyToManyField(to='backend.Account'),
        ),
    ]
