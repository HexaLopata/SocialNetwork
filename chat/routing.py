from django.urls import path
from .consumers import GroupChatConsumer, PrivateChatConsumer

ws_urlpatterns = [
    path('chat/private/<int:chat_id>/', PrivateChatConsumer.as_asgi()),
    path('chat/group/<int:chat_id>/', GroupChatConsumer.as_asgi())
]
