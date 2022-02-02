from enum import unique
from pyexpat import model
from django.utils.timezone import now
from django.db import models
from django.contrib.auth.models import User


# Account models
class Chat(models.Model):
    pass

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birthdate = models.DateField()
    profile_picture = models.ImageField(upload_to='static/images/%Y/%m/%d/', blank=True)
    background_picture = models.ImageField(upload_to='static/images/%Y/%m/%d/', blank=True)
    friends = models.ManyToManyField('Account')
    chats = models.ManyToManyField(Chat)

    def delete(self, *args, **kwargs):
        storage, path = self.path.storage, self.path.path
        super(Account, self).delete(*args, **kwargs)
        storage.delete(path)

    def __str__(self) -> str:
        return self.first_name

class Post(models.Model):
    author = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='posts')
    date = models.DateField(auto_now=True)
    image = models.ImageField(upload_to='static/images/%Y/%m/%d/', blank=True)
    body = models.TextField()
    likes = models.ManyToManyField(Account)


class Message(models.Model):
    author = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL)
    body = models.TextField()
    image = models.ImageField(upload_to='static/images/%Y/%m/%d/', blank=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)

 
class Request(models.Model):
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='friend_requests')
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='requests_to_me')