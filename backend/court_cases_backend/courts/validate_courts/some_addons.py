from courts.models import NotifyTask
from django.db.models import ObjectDoesNotExist
from datetime import datetime, timedelta
import re

date_regex = re.compile(r'[0-9]{2}.[0-9]{2}\.[0-9]{4}')
x_regex = re.compile(r'x|х')

def get_task_for_validator(court, need_create: bool,column_name: str) -> NotifyTask:
    try:
        task = NotifyTask.objects.get(court_id=court, source_column=column_name)
        return task
    except ObjectDoesNotExist as ex:
        if need_create:
            task = NotifyTask.objects.create(
                court_id = court,
                date_of_notify = datetime.date(datetime.now()) + timedelta(days=10),
                max_count_before_chief_notify = 10,
                count_update_day = 10,
                source_column = column_name,
            )
            return task

        else:
            return None

def delete_task(task: NotifyTask):
    if task is not None:
        NotifyTask.objects.get(id=task.id).delete()
