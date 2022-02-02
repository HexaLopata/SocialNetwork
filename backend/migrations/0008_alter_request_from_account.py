# Generated by Django 4.0.1 on 2022-02-02 20:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_alter_request_to_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='from_account',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.account'),
        ),
    ]
