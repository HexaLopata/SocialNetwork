from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    image_source = serializers.ImageField(source='image.source', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'body', 'image', 'image_source', 'date']


class PostWithAuthorSerializer(serializers.ModelSerializer):
    author_first_name = serializers.CharField(source='author.first_name')
    author_last_name = serializers.CharField(source='author.last_name')
    image_source = serializers.ImageField(source='image.source', read_only=True)


    class Meta:
        model = Post
        fields = ['id', 'author', 'body', 'image', 'image_source', 'date',
                  'author_first_name', 'author_last_name']

class IdPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id']