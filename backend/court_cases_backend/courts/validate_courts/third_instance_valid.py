from courts.models import CourtCases, NotifyTask
from datetime import datetime, timedelta
from .some_addons import get_task_for_validator, date_regex, delete_task, x_regex

def valid_thrinst_date_of_judgment(court: CourtCases):
    column_name = "thrinst_date_of_judgment"
    if court.thrinst_date_of_judgment is not None and (court.thrinst_brief_operative_part is None or court.thrinst_brief_operative_part == ''):
        if court.thrinst_date_of_judgment < datetime.date(datetime.now()):
            print('Создаем задачу')
            task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
            task.notify_message = f"Не заполнена графа третьей инстанции 'Краткая резолютивная часть судебного акта' в деле №{court.number_of_court}, куратора {court.user_id}"
            task.date_of_notify = court.thrinst_date_of_judgment + timedelta(days=10)
            task.count_update_day = 1
            task.max_count_before_chief_notify = 14
            task.save()

        else:
            task = get_task_for_validator(court=court,need_create=False, column_name=column_name)
            task.notify_message = f"Не заполнена графа третьей инстанции 'Краткая резолютивная часть судебного акта' в деле №{court.number_of_court}, куратора {court.user_id}"
            task.date_of_notify = datetime.date(datetime.now()) + timedelta(days=20)
            task.count_update_day = 5
            task.max_count_before_chief_notify = 3
            task.save()


    else:

        task = get_task_for_validator(court=court,need_create=False, column_name=column_name)
        delete_task(task)


def valid_thrinst_minfin_information(court: CourtCases):
    column_name = "thrinst_minfin_information"
    if court.thrinst_date_of_judgment is not None:
        if x_regex.findall(str(court.thrinst_minfin_information).lower()).__len__() == 0 and date_regex.findall(str(court.thrinst_minfin_information)).__len__() == 0:
            print('Создаем задачу')
            task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
            task.notify_message = f"Не заполнена графа третьей инстанции 'Информация о направлении справки по делу в ФК или Минфин' в деле №{court.number_of_court}, куратора {court.user_id}"
            task.date_of_notify = court.thrinst_date_of_judgment + timedelta(days=15)
            task.count_update_day = 1
            task.max_count_before_chief_notify = 9
            task.save()

        else:
            task = get_task_for_validator(court=court,need_create=False, column_name=column_name)
            delete_task(task)