from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birthdate = models.DateField()
    profile_picture = models.ImageField(upload_to='static/images/%Y/%m/%d/', blank=True)
    background_picture = models.ImageField(upload_to='static/images/%Y/%m/%d/', blank=True)
    friends = models.ManyToManyField('Account')

    def delete(self, *args, **kwargs):
        storage, path = self.path.storage, self.path.path
        super(Account, self).delete(*args, **kwargs)
        storage.delete(path)

    def __str__(self):
        return f'{self.first_name}'


class Request(models.Model):
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='friend_requests')
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='requests_to_me')

    def __str__(self):
        return f'{self.from_account} -> {self.to_account}'
        