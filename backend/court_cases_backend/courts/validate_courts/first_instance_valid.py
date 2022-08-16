from courts.models import CourtCases, NotifyTask
from datetime import datetime, timedelta
from .some_addons import get_task_for_validator, date_regex


def validate_fstinst_dates_of_court_hearing(court: CourtCases):
    column_name = 'fstinst_dates_of_court_hearing'
    if date_regex.findall(str(court.fstinst_dates_of_court_hearing)).__len__() != 0:
        old_date = True
        for key in court.fstinst_dates_of_court_hearing:
            date = court.fstinst_dates_of_court_hearing[key]
            if datetime.date(datetime.strptime(date, "%d.%m.%Y")) >= datetime.date(datetime.now()):
                old_date = False
            elif datetime.date(datetime.strptime(date,"%d.%m.%Y")) < datetime.date(datetime.now()) and old_date is True:
                notify_date = datetime.date(datetime.strptime(date, "%d.%m.%Y")) + timedelta(days=10)

        if old_date is True and court.fstinst_date_of_dicision is None:
            print('Создаем задачу')
            task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
            task.notify_message = f"Не заполнена графа первой инстанции 'Дата вынесения решения(только дата)' в деле №{court.number_of_court}, куратора {court.user_id}"
            task.date_of_notify = notify_date
            task.count_update_day = 1
            task.max_count_before_chief_notify = 3
            task.save()

            return False
        
        elif old_date is True:
            if court.fstinst_date_of_filing_in_court is not None or court.fstinst_date_of_receipt_of_judgment is not None:
                print('delete task')
                task = get_task_for_validator(court=court,need_create=False, column_name=column_name)
                if task is not None:
                    NotifyTask.objects.get(id=task.id).delete()
                return True
            else:
                print('task created')
                task = get_task_for_validator(court=court,need_create=True, column_name=column_name)
                task.notify_message = f"Не заполнены графы первой инстанции 'Дата направления заявления в суд на выдачу судебного акта.' или 'Дата получения судебного решения' в деле №{court.number_of_court}, куратора {court.user_id}"
                task.date_of_notify = notify_date
                task.count_update_day = 10
                task.max_count_before_chief_notify = 2
                task.save()

                return False
        
        elif old_date is False:
            task = get_task_for_validator(court=court,need_create=False, column_name=column_name)
            if task is not None:
                NotifyTask.objects.get(id=task.id).delete()
            return True

    else: 
        print('Создаем задачу')
        task = get_task_for_validator(court=court,need_create=True, column_name=column_name)
        task.notify_message = f"Не заполнена графа первой инстанции 'Даты судебных заседаний' в деле №{court.number_of_court}, куратора {court.user_id}"
        task.date_of_notify = datetime.date(datetime.now()) + timedelta(days=10)
        task.count_update_day = 10
        task.max_count_before_chief_notify = 2
        task.save()

        return False

def validate_fstinst_date_of_dicision(court: CourtCases):
    column_name = 'fstinst_date_of_dicision'
    print(court.fstinst_brief_operative_part)
    print(court.fstinst_date_of_dicision)
    if court.fstinst_date_of_dicision is not None and str(court.fstinst_brief_operative_part).lower().__contains__('взыскать с') is False:
        print('Создаем задачу')
        task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
        task.notify_message = f"Не заполнена графа первой инстанции 'Краткая резолютивная часть судебного акта' в деле №{court.number_of_court}, куратора {court.user_id}"
        task.date_of_notify = datetime.date(datetime.now())
        task.count_update_day = 1
        task.max_count_before_chief_notify = 15
        task.save()

        return False

    elif court.fstinst_date_of_dicision is not None and str(court.fstinst_brief_operative_part).lower().__contains__('взыскать с') \
    and (court.fstinst_date_appeal_by_the_parties is None or court.fstinst_date_appeal_to_the_court is None):
        print('Создаем задачу')
        task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
        task.notify_message = f"Не заполнены графы первой инстанции 'Дата направления апелляционной жалобы сторонам по делу' или 'Дата направления апелляционной жалобы в суд' в деле №{court.number_of_court}, куратора {court.user_id}"
        task.date_of_notify = datetime.date(datetime.now()) + timedelta(days=15)
        task.count_update_day = 1
        task.max_count_before_chief_notify = 14
        task.save()

        return False

    else:
        print('try delete task')
        task = get_task_for_validator(court=court, need_create=False, column_name=column_name)
        if task is not None:
            NotifyTask.objects.get(id=task.id).delete()

        return True

def validate_fstinst_minfin_information(court: CourtCases):
    column_name = 'fstinst_minfin_information'
    if court.fstinst_date_of_dicision is not None and str(court.fstinst_brief_operative_part).lower().__contains__('взыскать с'):
        if str(court.fstinst_minfin_information).lower() != 'x' and date_regex.findall(str(court.fstinst_minfin_information)).__len__() == 0:
            print('Создаем задачу')
            task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
            task.notify_message = f"Не заполнена графа первой инстанции 'Информация о направлении справки по делу в ФК или Минфин' в деле №{court.number_of_court}, куратора {court.user_id}"
            task.date_of_notify = datetime.date(datetime.now()) + timedelta(days=1)
            task.count_update_day = 1
            task.max_count_before_chief_notify = 14
            task.save()

            return False
        else:
            task = get_task_for_validator(court=court, need_create=False, column_name=column_name)
            if task is not None:
                NotifyTask.objects.get(id=task.id).delete()
     
