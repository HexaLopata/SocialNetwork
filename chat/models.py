from django.db import models
from account.models import Account

class Chat(models.Model):
    members = models.ManyToManyField(Account, related_name='chats')
    

class Message(models.Model):
    author = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL)
    body = models.TextField()
    image = models.ImageField(upload_to='static/images/%Y/%m/%d/', blank=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
