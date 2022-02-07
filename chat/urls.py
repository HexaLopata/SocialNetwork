from django.urls import path
from .views import *

urlpatterns = [
    # accepts POST request for create chats.
    path('chats/', ChatView.as_view()),
    # accepts GET and DELETE requests for retrieave or delete chat.
    path('chats/<int:pk>/', GetDeleteChatView.as_view()),
    # accepts GET request for list of all chats of current account 
    path('account/current/chats/', CurrentAccountChatsView.as_view())
]
