from courts.models import CourtCases

from .first_instance_valid import (validate_fstinst_date_of_dicision, 
validate_fstinst_dates_of_court_hearing, 
validate_fstinst_minfin_information)

from .second_instance_valid import (valid_fstinst_date_appeal_to_the_court,
valid_sndinst_date_of_dicision, 
valid_sndinst_minfin_information)


def run(court_id):
    court = CourtCases.objects.get(id=court_id)

    first_instance(court)

def first_instance(court: CourtCases):
    validate_fstinst_dates_of_court_hearing(court)
    validate_fstinst_date_of_dicision(court)
    validate_fstinst_minfin_information(court)

    valid_fstinst_date_appeal_to_the_court(court)
    valid_sndinst_date_of_dicision(court)
    valid_sndinst_minfin_information(court)    


