from courts.models import CourtCases, NotifyTask
from datetime import datetime, timedelta
from .some_addons import get_task_for_validator, date_regex


def valid_fstinst_date_appeal_to_the_court(court: CourtCases):
    column_name = "fstinst_date_appeal_to_the_court"
    
    if court.fstinst_date_appeal_to_the_court is not None \
    and date_regex.findall(str(court.sndinst_dates_of_court_hearing)).__len__() == 0:
        print('Создаем задачу')
        task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
        task.notify_message = f"Не заполнена графа второй инстрации 'Даты судебных заседаний' в деле №{court.number_of_court}, куратора {court.user_id}"
        task.date_of_notify = datetime.date(datetime.now()) + timedelta(days=20)
        task.count_update_day = 5
        task.max_count_before_chief_notify = 5
        task.save()

        return False

    elif court.fstinst_date_appeal_to_the_court is not None \
    and date_regex.findall(str(court.sndinst_dates_of_court_hearing)).__len__() != 0:
        old_date = True
        for key in court.sndinst_dates_of_court_hearing:
            date = court.sndinst_dates_of_court_hearing[key]
            if datetime.date(datetime.strptime(date, "%d.%m.%Y")) > datetime.date(datetime.now()):
                old_date = False
            elif datetime.date(datetime.strptime(date,"%d.%m.%Y")) < datetime.date(datetime.now()) and old_date is True:
                notify_date = datetime.date(datetime.strptime(date, "%d.%m.%Y")) + timedelta(days=10)

        if old_date is True and court.sndinst_date_of_dicision is None:
            print('Создаем задачу')
            task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
            task.notify_message = f"Не заполнена графа второй инстрации 'Дата вынесения апелляционного определения' в деле №{court.number_of_court}, куратора {court.user_id}"
            task.date_of_notify = notify_date
            task.count_update_day = 1
            task.max_count_before_chief_notify = 3
            task.save()

            return False

        elif court.sndinst_date_of_dicision is not None:
            if str(court.sndinst_brief_operative_part) == '':
                print('Создаем задачу')
                task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
                task.notify_message = f"Не заполнена графа второй инстрации 'Краткая резолютивная часть судебного акта' в деле №{court.number_of_court}, куратора {court.user_id}"
                task.date_of_notify = notify_date
                task.count_update_day = 1
                task.max_count_before_chief_notify = 3
                task.save()
        
                return False
            elif str(court.sndinst_brief_operative_part) != '':
                if court.sndinst_date_appeal_to_the_court is None and court.sndinst_date_appeal_by_the_parties is None:
                    print('Создаем задачу')
                    task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
                    task.notify_message = f"Не заполнена графа второй инстрации 'Дата направления кассационной жалобы сторонам по делу' или 'Дата направления кассационной жалобы в суд' в деле №{court.number_of_court}, куратора {court.user_id}"
                    task.date_of_notify = datetime.date(datetime.now()) + timedelta(days=15)
                    task.count_update_day = 1
                    task.max_count_before_chief_notify = 14
                    task.save()
                    
                else:
                    task = get_task_for_validator(court=court, need_create=False, column_name=column_name)
                    if task is not None:
                        NotifyTask.objects.get(id=task.id).delete()

                    return True

        else:
            task = get_task_for_validator(court=court, need_create=False, column_name=column_name)
            if task is not None:
                NotifyTask.objects.get(id=task.id).delete()

            return True

def valid_sndinst_date_of_dicision(court: CourtCases):
    column_name = "sndinst_date_of_dicision"

    if court.sndinst_date_of_dicision is not None \
    and date_regex.findall(str(court.sndinst_dates_of_court_hearing)).__len__() != 0:
        if court.sndinst_date_of_filing_in_court is None \
        and court.sndinst_date_of_receipt_of_judgment is None:
            print('task created')
            task = get_task_for_validator(court=court,need_create=True, column_name=column_name)
            task.notify_message = f"Не заполнены графы второй инстрации 'Дата направления заявления в суд на выдачу судебных актов.' или 'Дата получения судебных актов вступивших в законную силу' в деле №{court.number_of_court}, куратора {court.user_id}"
            task.date_of_notify = datetime.date(datetime.now()) + timedelta(days=10)
            task.count_update_day = 10
            task.max_count_before_chief_notify = 2
            task.save()

            return False
        else:
            task = get_task_for_validator(court=court, need_create=False, column_name=column_name)
            if task is not None:
                NotifyTask.objects.get(id=task.id).delete()

            return True


def valid_sndinst_minfin_information(court: CourtCases):
    column_name = 'sndinst_minfin_information'
    
    if court.sndinst_date_of_dicision is not None:
        if str(court.sndinst_minfin_information).lower() != 'x' and date_regex.findall(str(court.sndinst_minfin_information)).__len__() == 0:
            print('Создаем задачу')
            task = get_task_for_validator(court=court, need_create=True, column_name=column_name)
            task.notify_message = f"Не заполнена графа второй инстрации 'Информация о направлении справки по делу в ФК или Минфин' в деле №{court.number_of_court}, куратора {court.user_id}"
            task.date_of_notify = datetime.date(datetime.strptime(str(court.sndinst_date_of_dicision), "%Y-%m-%d")) + timedelta(days=15)
            task.count_update_day = 1
            task.max_count_before_chief_notify = 9
            task.save()

            return False
        
        else:
            task = get_task_for_validator(court=court, need_create=False, column_name=column_name)
            if task is not None:
                NotifyTask.objects.get(id=task.id).delete()

            return True