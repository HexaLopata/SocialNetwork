from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'author', 'body', 'image', 'date']


class PostWithAuthorSerializer(serializers.ModelSerializer):
    author_first_name = serializers.CharField(source='author.first_name')
    author_last_name = serializers.CharField(source='author.last_name')

    class Meta:
        model = Post
        fields = ['id', 'author', 'body', 'image', 'date',
                  'author_first_name', 'author_last_name']
