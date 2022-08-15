import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'court_cases_backend.settings')

app = Celery('tasks', broker='redis://localhost')
# app = Celery('tasks', broker='redis://redis')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'check-tasks-every-minut': {
        'task': 'courts.tasks.check_tasks',
        'schedule': crontab(), #crontab(hour=9, minute=30, day_of_week=1)
    },
}