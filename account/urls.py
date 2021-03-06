from .views import *
from django.urls import path


urlpatterns = [
    # accepts GET and PATCH requests for retrieve and update current account
    path('account/current/', CurrentAccountView.as_view()),
    # accepts GET request and returns account with specified id
    path('account/<int:pk>/', AccountView.as_view()),
    # accepts GET request and returns all accounts
    path('accounts/', AccountsView.as_view()),
    # accepts GET, POST and DELETE requests for list, add and delete friends
    path('account/current/friends/', CurrentAccountFriendsView.as_view()),
    # accepts GET request and returns all friends of the account with specified id
    path('account/<int:pk>/friends/', AccountFriendsView.as_view()),
    # accepts GET request and returns all friend requests sended to the current account
    path('account/current/requests/', FriendRequestView.as_view()),
    # accepts DELETE request and deletes friends request with specified id if account have permission
    path('requests/<int:pk>/', FriendRequestDetail.as_view())
]
