from rest_framework import serializers
from file_api.serializers import ImageSerializer
from .models import Account, Request


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


class RequestToAccountSerializer(serializers.ModelSerializer):
    to_account = ThumbnailAccountSerializer()

    class Meta:
        model = Request
        fields = ['id', 'from_account', 'to_account']


class RequestFromAccountSerializer(serializers.ModelSerializer):
    from_account = ThumbnailAccountSerializer()

    class Meta:
        model = Request
        fields = ['id', 'from_account', 'to_account']


class RequestSerializer(serializers.ModelSerializer):
    from_account = ThumbnailAccountSerializer()
    to_account = ThumbnailAccountSerializer()

    class Meta:
        model = Request
        fields = ['id', 'from_account', 'to_account']
