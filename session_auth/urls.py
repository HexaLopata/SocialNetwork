from .views import *
from django.urls import path

urlpatterns = [
    # accepts POST request with username, password and account info, then create account if data is correct
    path('register/', SignupView.as_view()),
    # accepts GET request and sets csrf cookie
    path('csrf/', CSRFTokenView.as_view()),
    # accepts GET request and tells if you are authenticated
    path('isAuthenticated/', IsAuthenticatedView.as_view()),
    # accepts POST request with username and password and tells if you are authenticated
    path('login/', LoginView.as_view()),
    # accepts POST request and logs out
    path('logout/', LogoutView.as_view()),
    # accepts DELETE request with password and deletes your account if the password is correct
    path('user/', DeleteUserView.as_view()),
]
