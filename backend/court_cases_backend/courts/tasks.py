from datetime import date, datetime, timedelta
from .celery import app
from django.core.mail import send_mail
from .models import NotifyTask, CustomUser, CourtCases

@app.task
def check_tasks():
    queryset = NotifyTask.objects.all()

    for item in queryset:
        print(item.date_of_notify)
        print(datetime.date(datetime.now()))
        if item.date_of_notify == datetime.date(datetime.now()):
            print('Время совпало')
            if item.notify_count >= item.max_count_before_chief_notify:
                print('Кол-во уведомлений >= необходимого для уведомления начальников')
                court_case = CourtCases.objects.get(id=item.court_id.id)
                user = CustomUser.objects.get(id=court_case.user_id)
                
                send_email_to_user.delay(user.email, item.notify_message)
                
                for _user in CustomUser.objects.filter(is_chief=True):
                    send_email_to_user.delay(_user.email, item.notify_message)

            else:
                print('Кол-во уведомлений < необходимого для уведомления начальников')
                court_case = CourtCases.objects.get(id=item.court_id.id)
                user = CustomUser.objects.get(id=court_case.user_id.id)
                
                send_email_to_user.delay(user.email, item.notify_message)
            
            item.notify_count += 1
            item.date_of_notify = datetime.date(datetime.now()) + timedelta(days=item.count_update_day)
            item.save()
        else:
            print('Время не совпало')

    return 'Tasks checked'


@app.task
def send_email_to_user(send_to, message):
    return (send_to, message)
