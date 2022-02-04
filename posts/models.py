from django.db import models
from account.models import Account


class Post(models.Model):
    author = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='posts')
    date = models.DateField(auto_now=True)
    image = models.ImageField(upload_to='static/images/%Y/%m/%d/', blank=True)
    body = models.TextField()
    likes = models.ManyToManyField(Account, related_name='liked_posts')
    