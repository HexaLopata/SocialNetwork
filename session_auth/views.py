from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.forms import ValidationError
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from account.serializers import AccountSerializer
from helpers.decorators import try_except_decorator
from account.models import Account
from session_auth.serializers import UserSerializer


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    """
    Accepts POST request with username, password and account info, then create account if
    data is correct.\n
    Input data:
    username: str
    password: str
    first_name: str
    last_name: str
    birthdate: date in YYYY-MM-DD format\n
    """
    permission_classes = [permissions.AllowAny]

    @try_except_decorator()
    def post(self, *args, **kwargs):
        data = self.request.data
        
        user_serializer = UserSerializer(data={
            'username' : data.pop('username', None),
            'password' : data.pop('password', None)
        })

        if user_serializer.is_valid():
            account_serializer = AccountSerializer(data=data)
            if account_serializer.is_valid():
                user = user_serializer.save()
                account_serializer.save(user=user)
            else:
                return Response(account_serializer.errors, status=400)
        else:
            return Response(user_serializer.errors, status=400)
                        
        return Response(account_serializer.data, status=201)


class DeleteUserView(APIView):
    """
    Accepts DELETE request with password and deletes your account if the password is correct.\n
    Input data:
    password: str\n
    """
    @try_except_decorator()
    def delete(self, *args, **kwargs):
        user = self.request.user
        data = self.request.data

        if user.check_password(data['password']):
            user.delete()
            return Response(status=204)
        return Response({'password': ['Invalid password']}, status=400)


@method_decorator(csrf_protect, name='dispatch')
class IsAuthenticatedView(APIView):
    """
    Accepts GET request and tells if you are authenticated.\n
    Output:\n
    is authenticated: {'isAuthenticated': 'true'}\n
    is not authenticated: {'isAuthenticated': 'false'}
    """
    permission_classes = [permissions.AllowAny]

    @try_except_decorator()
    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return Response({'isAuthenticated': True}, status=200)
        else:
            return Response({'isAuthenticated': False}, status=200)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    """
    Accepts POST request with username and password and tells if you are authenticated.\n
    Input data:
    username: str
    password: str
    """
    permission_classes = [permissions.AllowAny]

    @try_except_decorator()
    def post(self, *args, **kwargs):
        data = self.request.data

        username = data['username']
        password = data['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(self.request, user)
            return Response(status=204)
        else:
            return Response({'error': 'Invalid username or password'}, status=400)


class LogoutView(APIView):
    """
    Accepts POST request and logs out.\n
    """
    @try_except_decorator()
    def post(self, *args, **kwargs):
        logout(self.request)
        return Response(status=204)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class CSRFTokenView(APIView):
    """
    Accepts GET request and sets csrf cookie.\n
    Output:\n
    success: {'success': 'CSRF cookie set'}\n
    error: {'error': 'Something went wrong'}
    """
    permission_classes = [permissions.AllowAny]

    @try_except_decorator()
    def get(self, *args, **kwargs):
        return Response(status=204)
