from account.serializers import IdAccountSerializer, ThumbnailAccountSerializer
from rest_framework import serializers
from .models import GroupChat, GroupMessage, PrivateChat, PrivateMessage


class PrivateMessageSerializer(serializers.ModelSerializer):
    image_source = serializers.ImageField(
        source='image.source', read_only=True)

    class Meta:
        model = GroupMessage
        fields = '__all__'


class PrivateChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupChat
        fields = ['id', 'members', 'name', 'image', 'background_image']


class PrivateChatNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupChat
        fields = ['id', 'members', 'messages']
        depth = 1


class PrivateMessageSerializer(serializers.ModelSerializer):
    image_source = serializers.ImageField(
        source='image.source', read_only=True)
    author = IdAccountSerializer()

    class Meta:
        model = PrivateMessage
        fields = '__all__'


class PrivateChatSerializer(serializers.ModelSerializer):
    member_1 = ThumbnailAccountSerializer()
    member_2 = ThumbnailAccountSerializer()

    class Meta:
        model = PrivateChat
        fields = ['id', 'member_1', 'member_2']


class PrivateChatNestedSerializer(serializers.ModelSerializer):
    member_1 = ThumbnailAccountSerializer()
    member_2 = ThumbnailAccountSerializer()
    messages = PrivateMessageSerializer(many=True)

    class Meta:
        model = PrivateChat
        fields = ['id', 'member_1', 'member_2', 'messages']
