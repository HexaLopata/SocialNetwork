from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework import permissions, generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist

from backend.decorators import try_except_decorator
from backend.models import Account, Post
from backend.serializers import AccountSerializer, PostSerializer
from backend.validators import validate_date
from backend.permissions import IsOwner
# Authorization


class DeleteUserView(APIView):

    @try_except_decorator()
    def delete(self, *args, **kwargs):
        user = self.request.user
        data = self.request.data

        if user.check_password(data['password']):
            user.delete()
            return Response({'success': 'User deleted successfully'}, status=200)
        return Response({'error': 'Invalid password'}, status=400)


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    @try_except_decorator()
    def post(self, *args, **kwargs):
        data = self.request.data

        username = data['username']
        password = data['password']
        first_name = data['first_name']
        last_name = data['last_name']
        birthdate = data['birthdate']
        re_password = data['re_password']

        if password != re_password:
            return Response({'error': 'passwords do not match'}, status=400)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'User already exists'}, status=400)
        if len(password) < 8:
            return Response({'error': 'Password must be at least 8 characters'}, status=400)

        try:
            validate_date(birthdate)
        except ValidationError:
            return Response({'error': 'Incorrect data format, should be YYYY-MM-DD'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        account = Account(user=user, first_name=first_name,
                          last_name=last_name, birthdate=birthdate)
        account.save()
        return Response({'success': 'Account was created successfully'}, status=201)


@method_decorator(csrf_protect, name='dispatch')
class IsAuthenticatedView(APIView):
    permission_classes = [permissions.AllowAny]

    @try_except_decorator(error_message='Something went wrong', status=500)
    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return Response({'isAuthenticated': 'true'}, status=200)
        else:
            return Response({'isAuthenticated': 'false'}, status=200)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    @try_except_decorator()
    def post(self, *args, **kwargs):
        data = self.request.data

        username = data['username']
        password = data['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(self.request, user)
            return Response({'success': 'Login was successful'}, status=200)
        else:
            return Response({'error': 'Invalid username or password'}, status=400)


class LogoutView(APIView):

    @try_except_decorator(error_message='Something went wrong', status=500)
    def post(self, *args, **kwargs):
        logout(self.request)
        return Response({"success": "Logout was successful"}, status=200)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class CSRFTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    @try_except_decorator(error_message='Something went wrong', status=500)
    def get(self, *args, **kwargs):
        return Response({'success': 'CSRF cookie set'}, status=200)


class CurrentAccountView(APIView):
    @try_except_decorator(error_message='Something went wrong', status=500)
    def get(self, *args, **kwargs):
        user = self.request.user
        account_serializer = AccountSerializer(user.account)
        return Response(account_serializer.data)

    @try_except_decorator(error_message='Something went wrong', status=500)
    def patch(self, *args, **kwargs):
        data = self.request.data
        account = self.request.user.account
        birthdate = data.get('birthdate')
        if birthdate is not None:
            try:
                validate_date(birthdate)
            except ValidationError:
                return Response({'error': 'Incorrect date format, should be YYYY-MM-DD'}, status=400)

        for attr in data.keys():
            if hasattr(account, attr):
                setattr(account, attr, data[attr])
        account.save()
        return Response({'success': 'Account updated successfully'}, status=200)

# Models


class PostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        account = request.user.account
        self.request.data['author'] = account.id
        return super().create(request, *args, **kwargs)


class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsOwner]


class AccountPostsView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Account.objects.all()

    def get(self, request, *args, **kwargs):
        account = self.get_object()
        serializer = PostSerializer(account.posts, many=True)
        return Response(serializer.data)


class AccountFriendsView(generics.GenericAPIView):
    queryset = Account.objects.all()
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        account = self.get_object()
        return Response(AccountSerializer(account.friends, many=True).data)


class CurrentAccountFriendsView(APIView):
    @try_except_decorator(error_message='Something went wrong', status=500)
    def get(self, *args, **kwargs):
        account = Account.objects.get(user=self.request.user)
        return Response(AccountSerializer(account.friends, many=True).data)

    @try_except_decorator(error_message='Something went wrong', status=500)
    def post(self, *args, **kwargs):
        data = self.request.data
        friend_id = data.get('friend_account')
        account = Account.objects.get(user=self.request.user)
        friend = Account.objects.filter(id=friend_id).first()
        if friend is None:
            return Response({'error': 'This account does not exist'}, status=404)

        if account.id == friend.id:
            return Response({'error': 'You can`t send a request to yourself'}, status=400)
            
        already_friends = friend.friends.filter(id=account.id).first() is not None
        if already_friends:
            return Response({'error': 'You are already friends'}, status=400)
            
        mutual_request = friend.friend_requests.filter(to_account=account).first()
        if mutual_request is not None:
            friend.friend_requests.filter(id=mutual_request.id).delete()
            friend.friends.add(account)
            account.friends.add(friend)
            return Response({'success': 'You are friends now'}, status=200)
        else:
            if account.friend_requests.filter(to_account=friend).first() is not None:
                return Response({'error': 'You have already sent a request to this user'}, status=400)

            account.friend_requests.create(from_account=account, to_account=friend)
            return Response({'success': 'Your request has been sent'}, status=200)

    @try_except_decorator(error_message='Something went wrong', status=500)
    def delete(self, *args, **kwargs):
        data = self.request.data
        friend_id = data.get('friend_account')
        friend = Account.objects.filter(id=friend_id).first()
        if friend is None:
            return Response({'error': 'This account does not exist'}, status=404)

        account = Account.objects.get(user=self.request.user)
        friend = account.friends.filter(id=friend_id).first()
        if friend is None:
            return Response({'error': 'You aren`t friends'}, status=400)
        account.friends.remove(friend)
        friend.friends.remove(account)
        return Response({'success': 'You aren`t friends now'}, status=200)
