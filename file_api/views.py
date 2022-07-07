from rest_framework import generics
from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import ImageSerializer

class ImageUploadingView(generics.CreateAPIView):
    serializer_class = ImageSerializer
    parser_classes = [FormParser, MultiPartParser]