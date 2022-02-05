from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError('User already exists')
        return value
