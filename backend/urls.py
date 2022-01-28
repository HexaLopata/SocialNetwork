from django.urls import path, include
from .views import SignupView, CSRFTokenView, IsAuthenticatedView, LoginView, LogoutView

urlpatterns = [
    path('register/', SignupView.as_view()),
    path('csrf/', CSRFTokenView.as_view()),
    path('isAuthenticated/', IsAuthenticatedView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
]
