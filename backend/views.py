from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework import permissions, generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import authenticate, login, logout

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
    pass

class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsOwner]

