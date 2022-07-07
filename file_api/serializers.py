from .models import Image
from rest_framework.serializers import ModelSerializer

class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'source']