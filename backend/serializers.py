from rest_framework import serializers

from backend.models import Account, Post


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'birthdate', 'profile_picture', 'background_picture']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'author', 'body', 'image', 'date']