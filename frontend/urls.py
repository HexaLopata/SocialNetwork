from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('news/', views.index),
    path('profile/', views.index),
    path('messages/', views.index),
    path('login/', views.index),
    path('editProfile/', views.index),
    path('register/', views.index),
    path('chat/<int:pk>/', views.index),
    path('friends/', views.index),
]