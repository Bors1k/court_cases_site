from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token

from .models import CourtCases, CustomUser, NotifyTask # CourtFirstInstance, CourtSecondInstance, CourtThirdInstance

class CourtCasesAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Начало дела', {'fields': ('user_id', 'case_source_and_summ', 
        'claim', 'number_case_in_first_instance', 'number_case_in_numenklature')}),
        ('Первая инстанция', {'fields': ('fstinst_dates_of_court_hearing', 'fstinst_date_of_dicision', 
        'fstinst_brief_operative_part', 'fstinst_minfin_information', 'fstinst_date_of_filing_in_court',
        'fstinst_date_of_receipt_of_judgment',('fstinst_date_appeal_by_the_parties', 'fstinst_date_appeal_to_the_court')
        )}),
        ('Вторая инстанция', {'fields': ('sndinst_dates_of_court_hearing', 'sndinst_date_of_dicision',
        'sndinst_brief_operative_part', 'sndinst_minfin_information', 'sndinst_date_of_filing_in_court',
        'sndinst_date_of_receipt_of_judgment', ('sndinst_date_appeal_by_the_parties', 'sndinst_date_appeal_to_the_court'))}),
        ('Третья инстанция', {'fields': ('thrinst_date_of_judgment', 'thrinst_brief_operative_part',
        'thrinst_minfin_information','thrinst_date_of_application_court_acts', 'thrinst_date_of_receipt_acts')}),
        ('Итоги', {'fields': ('date_of_appeal','date_of_submission_appeal','total_amount_recovered',
        'information_about_need_recourse', 'summary_of_court')})
    )
    pass

class UserAdmin(BaseUserAdmin):   
    # отображение
    list_display = ('email', 'name', 'surename', 'is_admin')
    # фильтры справа в админке
    list_filter = ('is_admin',)
    # созданий групп в админке для удобства
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name','surename','patronymic')}),
        ('Permissions', {'fields': ('is_admin', 'is_chief')}),
    )

    # поля, которые необходимо заполнить при создании нового пользователя
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'surename', 'password1', 'password2'),
        }),
    )

    # поиск в админке будет осуществляться по полям
    search_fields = ('email', 'name', 'surename', 'patronymic')
    # сортировка будет по  следующим полям 
    ordering = ('email',)
    filter_horizontal = ()



admin.site.register(CustomUser, UserAdmin)
admin.site.unregister(Group)
admin.site.register(CourtCases, CourtCasesAdmin)
admin.site.register(NotifyTask)
# admin.site.register(Token)
# admin.site.register(CourtFirstInstance)
# admin.site.register(CourtSecondInstance)
# admin.site.register(CourtThirdInstance)