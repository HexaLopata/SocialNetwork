import os
from django.db import models

# Create your models here.
class Image(models.Model):
    source = models.ImageField(upload_to='static/images/%Y/%m/%d/')

    def delete(self, *args, **kwargs):
        os.remove(self.source.path)
        super().delete(*args, **kwargs)