from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.forms import ValidationError
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from helpers.decorators import try_except_decorator
from helpers.validators import validate_date
from account.models import Account


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    """
    Accepts POST request with username, password and account info, then create account if
    data is correct.\n
    Input data:
    username: str
    password: str
    re_password: str
    first_name: str
    last_name: str
    birthdate: date in YYYY-MM-DD format\n
    Output:\n
    success: {'success': 'Account was created successfully'}\n
    error: {'error': 'Error info'}
    """
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
            return Response({'error': 'Incorrect date format, should be YYYY-MM-DD'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        account = Account(user=user, first_name=first_name,
                          last_name=last_name, birthdate=birthdate)
        account.save()
        return Response({'success': 'Account was created successfully'}, status=201)


class DeleteUserView(APIView):
    """
    Accepts DELETE request with password and deletes your account if the password is correct.\n
    Input data:
    password: str\n
    Output:\n
    success: {'success': 'User deleted successfully'}\n
    error: {'error': 'Invalid password'}
    """
    @try_except_decorator()
    def delete(self, *args, **kwargs):
        user = self.request.user
        data = self.request.data

        if user.check_password(data['password']):
            user.delete()
            return Response({'success': 'User deleted successfully'}, status=200)
        return Response({'error': 'Invalid password'}, status=400)


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
            return Response({'isAuthenticated': 'true'}, status=200)
        else:
            return Response({'isAuthenticated': 'false'}, status=200)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    """
    Accepts POST request with username and password and tells if you are authenticated.\n
    Input data:
    username: str
    password: str\n
    Output:\n
    success: {'success': 'Login was successful'}\n
    error: {'error': 'Invalid username or password'}
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
            return Response({'success': 'Login was successful'}, status=200)
        else:
            return Response({'error': 'Invalid username or password'}, status=400)


class LogoutView(APIView):
    """
    Accepts POST request and logs out.\n
    Output:\n
    success: {"success": "Logout was successful"}\n
    error: {"error": "Something went wrong"}
    """
    @try_except_decorator()
    def post(self, *args, **kwargs):
        logout(self.request)
        return Response({"success": "Logout was successful"}, status=200)


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
        return Response({'success': 'CSRF cookie set'}, status=200)
