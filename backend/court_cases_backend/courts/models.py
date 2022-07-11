from ensurepip import version
from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email: str, name: str, surename: str, password=None, **extra_fields):
        if not email:
            raise ValueError('Пользователь должен иметь email')

        if not name:
            raise ValueError('Пользователь должен иметь имя')

        if not surename:
            raise ValueError('Пользователь должен иметь фамилию')

        user = self.model(
            email = self.normalize_email(email),
            name = name,
            surename = surename,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self.db)

        return user
    
    def create_superuser(self, email: str, name: str, surename: str, password: None, **extra_fields):
        if not email:
            raise ValueError('Пользователь должен иметь email')

        if not name:
            raise ValueError('Пользователь должен иметь имя')

        if not surename:
            raise ValueError('Пользователь должен иметь фамилия')

        user = self.model(
            email = self.normalize_email(email),
            name = name,
            surename = surename,
            **extra_fields,
        )
        user.is_admin = True
        user.set_password(password)
        user.save(using=self.db)

        return user

class CustomUser(AbstractBaseUser):
    
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    surename = models.CharField(max_length=255)
    patronymic = models.CharField(max_length=255)
    is_chief = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'

    REQUIRED_FIELDS = ['name', 'surename']

    def __str__(self):
        if self.patronymic:
            _patronymic = f'{self.patronymic[0]}.'
        else:
            _patronymic = ''
        return f'{self.surename} {self.name[0]}.{_patronymic}'

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class CourtCases(models.Model):


    class Meta:
        verbose_name = 'Судебное дело'
        verbose_name_plural = 'Судебные дела'


    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Куратор')
    number_of_court = models.FloatField(verbose_name='Номер дела', unique=True)
    case_source_and_summ = models.CharField(max_length=255, verbose_name='Кем заявлены требования и (сумма заявленных требований)')
    case_purpose = models.CharField(max_length=255, verbose_name='К кому заявлены требования + (3 лицо)')
    claim = models.CharField(max_length=255, verbose_name='Исковые требования')
    number_case_in_first_instance = models.CharField(max_length=255, verbose_name='N дела в суде первой инстанции')
    number_case_in_numenklature = models.CharField(max_length=255, verbose_name='N дела по внутренней номенклатуре')

    # Первая инстанция
    fstinst_dates_of_court_hearing = models.JSONField(blank=True, null=True, verbose_name='Даты судебных заседаний')
    fstinst_date_of_dicision = models.DateField(blank=True, null=True, verbose_name='Дата вынесения решения(только дата)')
    fstinst_brief_operative_part = models.TextField(blank=True, verbose_name='Краткая резолютивная часть судебного акта')
    fstinst_minfin_information = models.CharField(max_length=255, blank=True, 
    verbose_name='Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, X – не требуется')
    fstinst_date_of_filing_in_court = models.DateField(blank=True, null=True, verbose_name='Дата направления заявления в суд на выдачу судебного акта.')
    fstinst_date_of_receipt_of_judgment = models.DateField(blank=True, null=True, verbose_name='Дата получения судебного решения')
    fstinst_date_appeal_by_the_parties = models.DateField(blank=True, null=True, verbose_name='Дата направления апелляционной жалобы сторонам по делу')
    fstinst_date_appeal_to_the_court = models.DateField(blank=True, null=True, verbose_name='Дата направления апелляционной жалобы в суд')
    # Вторая инстанция
    sndinst_dates_of_court_hearing = models.JSONField(blank=True, null=True, verbose_name='Даты судебных заседаний')
    sndinst_date_of_dicision = models.DateField(blank=True, null=True, verbose_name='Дата вынесения апелляционного определения')
    sndinst_brief_operative_part = models.TextField(blank=True, verbose_name='Краткая резолютивная часть судебного акта')
    sndinst_minfin_information = models.CharField(max_length=255, blank=True, 
    verbose_name='Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, Х – не требуется')
    sndinst_date_of_filing_in_court = models.DateField(blank=True, null=True, verbose_name='Дата направления заявления в суд на выдачу судебных актов.')
    sndinst_date_of_receipt_of_judgment = models.DateField(blank=True, null=True, verbose_name='Дата получения судебных актов вступивших в законную силу')
    sndinst_date_appeal_by_the_parties = models.DateField(blank=True, null=True, verbose_name='Дата направления кассационной жалобы (Х - не требуется) сторонами по делу')
    sndinst_date_appeal_to_the_court = models.DateField(blank=True, null=True, verbose_name='Дата направления кассационной жалобы (Х - не требуется) в суд')

    # Третья инстанция
    thrinst_date_of_judgment = models.DateField(blank=True, null=True, verbose_name='Дата выынесения судебного акта  или дата рассмотрения (только дата)')
    thrinst_brief_operative_part = models.TextField(blank=True, verbose_name='Краткая резолютивная часть судебного акта')
    thrinst_minfin_information = models.CharField(max_length=255, blank=True, 
    verbose_name='Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, Х – не требуется')
    thrinst_date_of_application_court_acts = models.DateField(blank=True, null=True, verbose_name='Дата направления заявления в суд на выдачу судебных актов.')
    thrinst_date_of_receipt_acts = models.DateField(blank=True, null=True, verbose_name='Дата получения судебных актов.')

    # Финал
    date_of_appeal = models.CharField(max_length=255, blank=True, 
    verbose_name='Дата направления кассационной жалобы в судебную коллегию ВС РФ (Х - не требуется) (1 кассация рассмотрена по существу (ГПК))') 
    date_of_submission_appeal = models.CharField(max_length=255, blank=True, 
    verbose_name='НАДЗОР Дата направления надзорной жалобы в президиум ВС РФ (Х - не требуется)')
    total_amount_recovered = models.CharField(max_length=255, blank=True, verbose_name='ИТОГОВАЯ сумма взыскания')
    information_about_need_recourse = models.CharField(max_length=255, blank=True, verbose_name='Инф-я о необходимости подачи регресса, надзорной жалобы, Комментарии')
    summary_of_court =  models.CharField(max_length=255, blank=True, verbose_name='ИТОГ по делу')
        
    def __str__(self):
        return f'{self.number_of_court} | {self.user_id}' 

class NotifyTask(models.Model):
    class Meta:
        verbose_name = 'Задача на уведомление'
        verbose_name_plural = 'Задачи на уведомления'
    court_id = models.ForeignKey(CourtCases, on_delete=models.CASCADE, verbose_name='Дело')
    notify_message = models.TextField(verbose_name='Текст сообщения')
    date_of_notify = models.DateField(verbose_name='Дата, когда будет отправлено сообщение')
    notify_count = models.IntegerField(verbose_name='Кол-во отправленых уведомлений', default=0)
    max_count_before_chief_notify = models.IntegerField(verbose_name='Кол-во уведомлений, перед сообщением начальникам')
    source_column = models.CharField(max_length=255,blank=True, verbose_name='Колонка проверки')
    count_update_day = models.IntegerField(verbose_name='Обновить дату на ...дней')

    def __str__(self) -> str:
        return f'Дело - {self.court_id.number_of_court} | Сообщение - {self.notify_message[:60]}...'