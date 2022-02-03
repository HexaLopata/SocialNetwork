from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import *

urlpatterns = [
    path('register/', SignupView.as_view()),
    path('csrf/', CSRFTokenView.as_view()),
    path('isAuthenticated/', IsAuthenticatedView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('user/', DeleteUserView.as_view()),
    path('account/current/', CurrentAccountView.as_view()),
    path('account/<int:pk>/', AccountView.as_view()),
    path('accounts/', AccountsView.as_view()),
    path('account/current/friends/', CurrentAccountFriendsView.as_view()),
    path('account/<int:pk>/friends/', AccountFriendsView.as_view()),
    path('account/<int:pk>/posts/', AccountPostsView.as_view()),
    path('account/current/posts/', CurrentAccountPostsView.as_view()),
    path('posts/', PostView.as_view()),
    path('posts/<int:pk>/', PostDeleteView.as_view()),
    path('account/current/friends/posts/', FriendsPostsView.as_view()),
    # TODO
    # path('chats/', ) post
    # path('chats/<int:pk>/', ) get/delete
    # path('chats/<int:pk>/'messages/', ) get
    # path('messages/<int:pk>/', ) patch/delete
    # path('messages/', ) post
    # path('account'/<int:pk>/chats/) get
    # path('account'/current/chats/) get
]