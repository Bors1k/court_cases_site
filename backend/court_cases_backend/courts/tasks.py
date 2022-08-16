from datetime import date, datetime, timedelta
from .celery import app
from django.core.mail import send_mail, send_mass_mail
from .models import NotifyTask, CustomUser, CourtCases
from .validate_courts.main_court_validator import run

@app.task
def check_tasks():
    print('проверка задач')
    queryset = NotifyTask.objects.all()

    for item in queryset:
        print(item.date_of_notify)
        print(datetime.date(datetime.now()))
        if item.date_of_notify == datetime.date(datetime.now()):
            print('Время совпало')
            if item.notify_count >= item.max_count_before_chief_notify:
                print('Кол-во уведомлений >= необходимого для уведомления начальников')
                court_case = CourtCases.objects.get(id=item.court_id.id)
                user = CustomUser.objects.get(id=court_case.user_id.id)
                
                send_to_emails = []
                send_to_emails.append(user.email)
                
                for _user in CustomUser.objects.filter(is_chief=True):
                    send_to_emails.append(_user.email)
                
                send_email_to_user(send_to_emails, item.notify_message,item.court_id.number_of_court)
            else:
                print('Кол-во уведомлений < необходимого для уведомления начальников')
                court_case = CourtCases.objects.get(id=item.court_id.id)
                user = CustomUser.objects.get(id=court_case.user_id.id)
                
                send_email_to_user([user.email], item.notify_message,item.court_id.number_of_court)
            
            item.notify_count += 1
            item.date_of_notify = datetime.date(datetime.now()) + timedelta(days=item.count_update_day)
            item.save()
        else:
            print('Время не совпало')

    return 'Tasks checked'


@app.task
def send_email_to_user(send_to, message, court_number):
    print(court_number)
    print(send_to)
    send_mail(subject=f'Уведомление по делу №{court_number}', message=message, from_email='Court-Cases@fsfk.local', recipient_list=send_to ,fail_silently=False)

# @app.task
# def send_email_to_users(send_to, message):
#     print(send_to)
#     send_mass_mail(subject='Уведомление по делу', message=message, from_email='CourtCases@gmail.com', recipient_list=send_to ,fail_silently=False)


@app.task
def create_task(court_id):
    run(court_id)
