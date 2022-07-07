from django.urls import path
from .views import *

urlpatterns = [
    path('images/', ImageUploadingView.as_view()),
]
