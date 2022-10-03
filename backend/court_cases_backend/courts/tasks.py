from datetime import date, datetime, timedelta
from .celery import app
from django.core.mail import send_mail, send_mass_mail
from .models import NotifyTask, CustomUser, CourtCases
from .validate_courts.main_court_validator import run
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from password import *

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
                
                send_email_to_user(send_to_emails, item.notify_message,item.court_id.id)
            else:
                print('Кол-во уведомлений < необходимого для уведомления начальников')
                court_case = CourtCases.objects.get(id=item.court_id.id)
                user = CustomUser.objects.get(id=court_case.user_id.id)
                
                send_email_to_user([user.email], item.notify_message,item.court_id.id)
            
            item.notify_count += 1
            item.date_of_notify = datetime.date(datetime.now()) + timedelta(days=item.count_update_day)
            item.save()
        else:
            print('Время не совпало')

    return 'Tasks checked'


# @app.task
# def send_email_to_user(send_to, message, court_number):
#     print(court_number)
#     print(send_to)
#     send_mail(subject=f'Уведомление по делу №{court_number}', message=message, from_email='Court-Cases@fsfk.local', recipient_list=send_to ,fail_silently=False)

@app.task
def send_email_to_user(send_to, message, court_number):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Уведомление по делу №{court_number}'
    msg['From'] = 'COURT-CASES@fsfk.local'
    # msg['From'] = EMAIL_HOST_USER
    recievers = ''
    for reciever in send_to:
        recievers += f'{reciever},'
    print(recievers)
    msg['To'] = recievers

    text = 'text'
    html = """\
    <html>
            <head></head>
            <body>
                <p><br>
                    <h1 align="center">{}</h1>
                    <p>{}</p>
                </p>
            </body>
        </html>
    """.format(f'Уведомление по делу №{court_number}', message)

    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')

    msg.attach(part1)
    msg.attach(part2)

    server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
    server.ehlo()
    # server.starttls()
    # server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    server.sendmail(EMAIL_HOST_USER, send_to, msg.as_string())
    server.quit()

# @app.task
# def send_email_to_users(send_to, message):
#     print(send_to)
#     send_mass_mail(subject='Уведомление по делу', message=message, from_email='CourtCases@gmail.com', recipient_list=send_to ,fail_silently=False)


@app.task
def create_task(court_id):
    run(court_id)
