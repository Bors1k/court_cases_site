from dataclasses import fields
from django.conf import settings

from rest_framework import serializers
from .models import CustomUser, CourtCases, NotifyTask
import court_cases_backend.settings as settings

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'surename', 'patronymic', 'is_admin', 'is_chief']

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ('password')

class CourtCasesSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = CourtCases
        fields = '__all__'

    def get_user_name(self,court):
        user_name = str(CustomUser.objects.get(id=court.user_id.id))
        return user_name
    
class NotifyTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotifyTask
        fields = '__all__'