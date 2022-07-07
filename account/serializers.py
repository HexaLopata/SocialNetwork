from rest_framework import serializers
from file_api.serializers import ImageSerializer
from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    profile_picture_source = serializers.ImageField(
        source='profile_picture.source', read_only=True)
    background_picture_source = serializers.ImageField(
        source='background_picture.source', read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'birthdate',
                  'profile_picture', 'background_picture',
                  'background_picture_source', 'profile_picture_source']


class ThumbnailAccountSerializer(serializers.ModelSerializer):
    profile_picture_source = serializers.ImageField(
        source='profile_picture.source', read_only=True)

    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name',
                  'birthdate', 'profile_picture', 'profile_picture_source']
