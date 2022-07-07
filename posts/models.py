from django.db import models
from account.models import Account
from file_api.models import Image


class Post(models.Model):
    author = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='posts')
    date = models.DateField(auto_now=True)
    image = models.OneToOneField(
        Image, on_delete=models.SET_NULL, blank=True, null=True)
    body = models.TextField()
    likes = models.ManyToManyField(Account, related_name='liked_posts')

    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)
