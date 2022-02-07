from rest_framework import serializers
from .models import Chat, Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'members']

class ChatNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'members', 'messages']
        depth = 1
        