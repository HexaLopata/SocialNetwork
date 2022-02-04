from django.db.models import Subquery
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer, PostWithAuthorSerializer
from helpers.decorators import try_except_decorator
from account.permissions import IsOwner
from account.models import Account


class PostView(generics.ListCreateAPIView):
    """
    Accepts GET and POST requests for list or create posts.\n
    The author is set automatically\n
    On create input data:
    body: str
    image: str !optional
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        account = request.user.account
        self.request.data['author'] = account.id
        return super().create(request, *args, **kwargs)


class PostDeleteView(generics.DestroyAPIView):
    """
    Accepts DELETE request and deletes post with the identifier specified in the URL.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsOwner]


class AccountPostsView(generics.GenericAPIView):
    """
    Accepts GET request for list all posts of the account specified in the URL.
    """
    permission_classes = [permissions.AllowAny]
    queryset = Account.objects.all()

    def get(self, *args, **kwargs):
        account = self.get_object()
        serializer = PostSerializer(account.posts, many=True)
        return Response(serializer.data)


class CurrentAccountPostsView(APIView):
    """
    Accepts GET request for list all posts of current account.
    """
    @try_except_decorator()
    def get(self, *args, **kwargs):
        account = Account.objects.get(user=self.request.user)
        serializer = PostSerializer(account.posts, many=True)
        return Response(serializer.data) 


class FriendsPostsView(APIView):
    """
    Accepts GET request for list all posts of all friends of the current account
    """
    @try_except_decorator()
    def get(self, *args, **kwargs):
        account = Account.objects.get(user=self.request.user)
        posts = Post.objects.filter(author_id__in=Subquery(account.friends.values('id'))).select_related('author')
        return Response(PostWithAuthorSerializer(posts, many=True).data)
