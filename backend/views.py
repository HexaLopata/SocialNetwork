from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from .decorators import try_except_decorator
from django.contrib.auth import authenticate, login, logout
import re

from backend.models import Account


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

        if not re.match(r'[0-9]{4}-[0-9]{2}-[0-9]{2}', birthdate):
            return Response({'error': 'Date must be in YYYY-MM-DD format'}, status=400)
        date_fields = birthdate.split('-')
        if int(date_fields[1]) > 12 or int(date_fields[2]) > 31:
            return Response({'error': 'Date must be in YYYY-MM-DD format'}, status=400)

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
