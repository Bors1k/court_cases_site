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

    # def update(self, instance, validated_data):
        # instance.set_password(validated_data['password'])
        # instance.save()

        # return instance

class CourtCasesSerializer(serializers.ModelSerializer):
    # fstinst_date_of_dicision = serializers.DateField(format='%d.%m.%Y',input_formats=['%d.%m.%Y'])

    class Meta:
        model = CourtCases
        fields = '__all__'
    
class NotifyTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotifyTask
        fields = '__all__'