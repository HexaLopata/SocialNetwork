from django.urls import path
from .views import *

urlpatterns = [
    # accepts GET requests for retrieave chat.
    path('account/current/chats/private/<int:pk>/', PrivateChatDetailView.as_view()),
    # accepts GET request for list of all chats of current account 
    path('account/current/chats/private/', CurrentAccountPrivateChatsView.as_view()),
]
