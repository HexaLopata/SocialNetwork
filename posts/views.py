from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request
from posts.services import PostService
from .models import Post
from .serializers import IdPostSerializer, PostSerializer, PostWithAuthorSerializer
from helpers.decorators import try_except_decorator
from account.permissions import IsOwner
from account.models import Account
from account.services import AccountService

acs = AccountService()
ps = PostService()


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

    def create(self, request: Request, *args, **kwargs):
        account = acs.get_current_account(self.request)
        self.request.data['author'] = account.pk
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
        account = acs.get_current_account(self.request)
        posts = account.posts
        liked_posts = ps.get_liked_posts(account, posts)
        return Response({
            'posts': PostSerializer(posts, many=True).data,
            'liked_posts': IdPostSerializer(liked_posts, many=True).data
        })


class FriendsPostsView(APIView):
    """
    Accepts GET request for list all posts of all friends of the current account
    """
    @try_except_decorator()
    def get(self, *args, **kwargs):
        account = acs.get_current_account(self.request)
        posts = ps.get_posts_of_friends(account)
        liked_posts = ps.get_liked_posts(account, posts)
        return Response({
            'posts': PostWithAuthorSerializer(posts, many=True).data,
            'liked_posts': IdPostSerializer(liked_posts, many=True).data
        })

class RatePostView(APIView):
    """
    Accepts POST and DELETE requests to like or cancel like
    """
    def get_post(self, pk: int):
        return get_object_or_404(Post, id=pk)

    def delete(self, *args, **kwargs):
        self.account = acs.get_current_account(self.request)
        post = self.get_post(kwargs['pk'])
        post.likes.remove(self.account)
        return Response(status=204)

    def post(self, *args, **kwargs):
        self.account = acs.get_current_account(self.request)
        post = self.get_post(kwargs['pk'])
        post.likes.add(self.account)
        return Response(status=204)