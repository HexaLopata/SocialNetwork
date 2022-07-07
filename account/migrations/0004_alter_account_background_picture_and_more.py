# Generated by Django 4.0.5 on 2022-07-07 15:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('file_api', '0002_alter_image_source'),
        ('account', '0003_alter_account_background_picture_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='background_picture',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='background_account', to='file_api.image'),
        ),
        migrations.AlterField(
            model_name='account',
            name='profile_picture',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile_account', to='file_api.image'),
        ),
    ]
