from django.db import models
from account.models import Account
from file_api.models import Image

class Chat(models.Model):
    members = models.ManyToManyField(Account, related_name='chats')
    name = models.TextField(max_length=50)
    image = models.OneToOneField(Image, blank=True, null=True, on_delete=models.SET_NULL, related_name='chat')
    background_image = models.OneToOneField(Image, blank=True, null=True, on_delete=models.SET_NULL, related_name='background_chat')

    def delete(self, *args, **kwargs):
        self.image.delete()
        self.background_image.delete()
        super().delete(*args, **kwargs)

class Message(models.Model):
    author = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL)
    body = models.TextField()
    image = models.OneToOneField(Image, blank=True, null=True, on_delete=models.SET_NULL)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')

    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)
