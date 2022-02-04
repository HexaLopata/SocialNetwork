from django.urls import path
from .views import *

urlpatterns = [
    # accepts GET request for list all posts of given account
    path('account/<int:pk>/posts/', AccountPostsView.as_view()),
    # accepts GET request for list all posts of current account
    path('account/current/posts/', CurrentAccountPostsView.as_view()),
    # accepts GET and POST requests for list or create posts
    path('posts/', PostView.as_view()),
    # accepts DELETE request and deletes post with given id
    path('posts/<int:pk>/', PostDeleteView.as_view()),
    # accepts GET request for list all posts of all friends of the current account
    path('account/current/friends/posts/', FriendsPostsView.as_view()),
]
