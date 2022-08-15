"""court_cases_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
import courts.views as views


urlpatterns = [
    path('notifies/', views.get_notifies, name='notifies'),
    path('notifies/<str:pk>/', views.get_notifies_for_court, name='notifies_by_court_id'),
    path('users/',views.get_users,name='users'),
    path('users/current-detail/',views.get_current_user_info,name='user_info'),
    path('users/update-password/', views.update_password, name='update_password'),
    path('users/update-info/', views.update_user, name='update_info'),
    path('users/<str:pk>/',views.get_user_by_id,name='user_by_id_detail'),
    path('courts/',views.get_courts,name='courts'),
    path('courts/create/', views.create_court, name='create_court'),
    path('courts/<str:pk>/', views.get_court_details, name='court_detail'),
    path('courts/<str:pk>/update/', views.update_court, name='court_update'),
    path('courts/<str:pk>/delete/', views.del_court_by_id, name='court_delete'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('admin/', admin.site.urls),

]
