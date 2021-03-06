# Generated by Django 4.0.5 on 2022-07-26 20:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('file_api', '0001_initial'),
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupChat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=50)),
                ('background_image', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='background_chat', to='file_api.image')),
                ('image', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='chat', to='file_api.image')),
                ('members', models.ManyToManyField(related_name='group_chats', to='account.account')),
            ],
        ),
        migrations.CreateModel(
            name='PrivateChat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('member_1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_private_chats', to='account.account')),
                ('member_2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='joined_private_chats', to='account.account')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='account.account')),
                ('chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat.groupchat')),
                ('image', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='file_api.image')),
            ],
        ),
        migrations.AddConstraint(
            model_name='privatechat',
            constraint=models.UniqueConstraint(fields=('member_1', 'member_2'), name='chat_privatechat_members_unique'),
        ),
    ]
