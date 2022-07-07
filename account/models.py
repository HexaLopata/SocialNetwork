from django.db import models
from django.contrib.auth.models import User
from file_api.models import Image


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birthdate = models.DateField()
    profile_picture = models.OneToOneField(
        Image, blank=True, null=True, on_delete=models.SET_NULL, related_name='profile_account')
    background_picture = models.OneToOneField(
        Image, blank=True, null=True, on_delete=models.SET_NULL, related_name='background_account')
    friends = models.ManyToManyField('Account')

    def delete(self, *args, **kwargs):
        self.profile_picture.delete()
        self.background_image.delete()
        super().delete(*args, **kwargs)

    def __str__(self):
        return f'{self.first_name}'


class Request(models.Model):
    from_account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='friend_requests')
    to_account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='requests_to_me')

    def __str__(self):
        return f'{self.from_account} -> {self.to_account}'
