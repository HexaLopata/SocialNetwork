from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('account.urls')),
    path('api/', include('posts.urls')),
    path('api/', include('chat.urls')),
    path('api/auth/', include('session_auth.urls')),
    path('api/', include('file_api.urls')),
    path('', include('frontend.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
