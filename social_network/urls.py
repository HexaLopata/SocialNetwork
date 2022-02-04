from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('account.urls')),
    path('api/', include('posts.urls')),
    path('api/', include('chat.urls')),
    path('api/auth/', include('session_auth.urls')),
    path('', include('frontend.urls'))
]
