import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DateInput from './DateInput';
import JSONdateManager from './JSONdateManager'
import TextInput from './TextInput';

function CourtForm ({court}){
    const [courtNumber, setCourtNumber] = useState(court.number_of_court)
    const [case_source_and_summ, setCase_source_and_summ] = useState(court.case_source_and_summ)
    const [case_purpose, setCase_purpose] = useState(court.case_purpose)
    const [claim, setClaim] = useState(court.claim)
    const [number_case_in_first_instance, setNumber_case_in_first_instance] = useState(court.number_case_in_first_instance)
    const [number_case_in_numenklature, setNumber_case_in_numenklature] = useState(court.number_case_in_numenklature)
    
    const [fstinst_dates_of_court_hearing, setFstinst_dates_of_court_hearing] = useState(court.fstinst_dates_of_court_hearing)
    if (fstinst_dates_of_court_hearing == undefined || fstinst_dates_of_court_hearing == null){
        setFstinst_dates_of_court_hearing({})
    }
    const [fstinst_date_of_dicision, setFstinst_date_of_dicision] = useState(court.fstinst_date_of_dicision == null ? '': court.fstinst_date_of_dicision)
    const [fstinst_brief_operative_part, setFstinst_brief_operative_part] = useState(court.fstinst_brief_operative_part)
    const [fstinst_minfin_information, setFstinst_minfin_information] = useState(court.fstinst_minfin_information)
    const [fstinst_date_of_filing_in_court, setFstinst_date_of_filing_in_court] = useState(court.fstinst_date_of_filing_in_court == null ? '': court.fstinst_date_of_filing_in_court)
    const [fstinst_date_of_receipt_of_judgment, setFstinst_date_of_receipt_of_judgment] = useState(court.fstinst_date_of_receipt_of_judgment == null ? '': court.fstinst_date_of_receipt_of_judgment)
    const [fstinst_date_appeal_by_the_parties, setFstinst_date_appeal_by_the_parties] = useState(court.fstinst_date_appeal_by_the_parties == null ? '': court.fstinst_date_appeal_by_the_parties)
    const [fstinst_date_appeal_to_the_court, setFstinst_date_appeal_to_the_court] = useState(court.fstinst_date_appeal_to_the_court == null ? '': court.fstinst_date_appeal_to_the_court)

    
    const [sndinst_dates_of_court_hearing, setSndinst_dates_of_court_hearing] = useState(court.sndinst_dates_of_court_hearing)
    if (sndinst_dates_of_court_hearing == undefined || sndinst_dates_of_court_hearing == null){
        setSndinst_dates_of_court_hearing({})
    }
    const [sndinst_date_of_dicision, setSndinst_date_of_dicision] = useState(court.sndinst_date_of_dicision == null ? '': court.sndinst_date_of_dicision)
    const [sndinst_brief_operative_part, setSndinst_brief_operative_part] = useState(court.sndinst_brief_operative_part)
    const [sndinst_minfin_information, setSndinst_minfin_information] = useState(court.sndinst_minfin_information)
    const [sndinst_date_of_filing_in_court, setSndinst_date_of_filing_in_court] = useState(court.sndinst_date_of_filing_in_court == null ? '': court.sndinst_date_of_filing_in_court)
    const [sndinst_date_of_receipt_of_judgment, setSndinst_date_of_receipt_of_judgment] = useState(court.sndinst_date_of_receipt_of_judgment == null ? '': court.sndinst_date_of_receipt_of_judgment)
    const [sndinst_date_appeal_by_the_parties, setSndinst_date_appeal_by_the_parties] = useState(court.sndinst_date_appeal_by_the_parties == null ? '': court.sndinst_date_appeal_by_the_parties)
    const [sndinst_date_appeal_to_the_court, setSndinst_date_appeal_to_the_court] = useState(court.sndinst_date_appeal_to_the_court == null ? '':court.sndinst_date_appeal_to_the_court)
    
    const [thrinst_date_of_judgment, setThrinst_date_of_judgment] = useState(court.thrinst_date_of_judgment == null ? '': court.thrinst_date_of_judgment)
    const [thrinst_brief_operative_part, setThrinst_brief_operative_part] = useState(court.thrinst_brief_operative_part)
    const [thrinst_minfin_information, setThrinst_minfin_information] = useState(court.thrinst_minfin_information)
    const [thrinst_date_of_application_court_acts, setThrinst_date_of_application_court_acts] = useState(court.thrinst_date_of_application_court_acts == null ? '': court.thrinst_date_of_application_court_acts)
    const [thrinst_date_of_receipt_acts, setThrinst_date_of_receipt_acts] = useState(court.thrinst_date_of_receipt_acts == null ? '': court.thrinst_date_of_receipt_acts)


    const [date_of_appeal, setDate_of_appeal] = useState(court.date_of_appeal)
    const [date_of_submission_appeal, setDate_of_submission_appeal] = useState(court.date_of_submission_appeal)
    const [total_amount_recovered, setTotal_amount_recovered] = useState(court.sndinst_minfin_information)
    const [information_about_need_recourse, setInformation_about_need_recourse] = useState(court.information_about_need_recourse)
    const [summary_of_court, setSummary_of_court] = useState(court.summary_of_court)


    return (
        <Form>
            <Row>
                <Col>
                    <h4 style={{'textAlign': 'center'}}>Начало дела</h4>
                </Col>
            </Row>
            <TextInput value={courtNumber} setValue={setCourtNumber} label='Номер дела' />
            <TextInput value={court.user_name} label='Куратор' readOnly/>
            <TextInput value={case_source_and_summ} setValue={setCase_source_and_summ} 
            label='Кем заявлены требования и (сумма заявленных требований):' />
            <TextInput value={case_purpose} setValue={setCase_purpose} label='К кому заявлены требования + (3 лицо)' />
            <TextInput value={claim} setValue={setClaim} label='Исковые требования' />
            <TextInput value={number_case_in_first_instance} setValue={setNumber_case_in_first_instance} label='N дела в суде первой инстанции' />
            <TextInput value={number_case_in_numenklature} setValue={setNumber_case_in_numenklature} label='N дела по внутренней номенклатуре' />
            <Row>
                <Col>
                    <hr></hr>
                    <h4 style={{'textAlign': 'center'}}>I инстаниця</h4>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="fstinst_dates_of_court_hearing">
                <JSONdateManager json={fstinst_dates_of_court_hearing} 
                setJson={setFstinst_dates_of_court_hearing}
                name="Даты судебных заседаний"
                />
            </Form.Group>

            <DateInput value={fstinst_date_of_dicision} setValue={setFstinst_date_of_dicision} label='Дата вынесения решения(только дата)' />
            <TextInput value={fstinst_brief_operative_part} setValue={setFstinst_brief_operative_part} label='Краткая резолютивная часть судебного акта' />
            <TextInput value={fstinst_minfin_information} setValue={setFstinst_minfin_information} 
            label='Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, X – не требуется' />
            <DateInput value={fstinst_date_of_filing_in_court} setValue={setFstinst_date_of_filing_in_court} 
            label='Дата направления заявления в суд на выдачу судебного акта.' />
            <DateInput value={fstinst_date_of_receipt_of_judgment} setValue={setFstinst_date_of_receipt_of_judgment} 
            label='Дата получения судебного решения' />
            <DateInput value={fstinst_date_appeal_by_the_parties} setValue={setFstinst_date_appeal_by_the_parties} 
            label='Дата направления апелляционной жалобы сторонам по делу' />
            <DateInput value={fstinst_date_appeal_to_the_court} setValue={setFstinst_date_appeal_to_the_court} 
            label='Дата направления апелляционной жалобы в суд' />

            <Row>
                <Col>
                    <hr></hr>
                    <h4 style={{'textAlign': 'center'}}>II инстаниця</h4>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="sndinst_dates_of_court_hearing">
                <JSONdateManager json={sndinst_dates_of_court_hearing} 
                setJson={setSndinst_dates_of_court_hearing}
                name="Даты судебных заседаний"
                />
            </Form.Group>

            <DateInput value={sndinst_date_of_dicision} setValue={setSndinst_date_of_dicision} 
            label='Дата вынесения апелляционного определения' />
            <TextInput value={sndinst_brief_operative_part} setValue={setSndinst_brief_operative_part} label='Краткая резолютивная часть судебного акта' />
            <TextInput value={sndinst_minfin_information} setValue={setSndinst_minfin_information} 
            label='Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, Х – не требуется' />
            <DateInput value={sndinst_date_of_filing_in_court} setValue={setSndinst_date_of_filing_in_court} 
            label='Дата направления заявления в суд на выдачу судебных актов.' />
            <DateInput value={sndinst_date_of_receipt_of_judgment} setValue={setSndinst_date_of_receipt_of_judgment} 
            label='Дата получения судебных актов вступивших в законную силу' />
            <DateInput value={sndinst_date_appeal_by_the_parties} setValue={setSndinst_date_appeal_by_the_parties} 
            label='Дата направления кассационной жалобы (Х - не требуется) сторонами по делу' />
            <DateInput value={sndinst_date_appeal_to_the_court} setValue={setSndinst_date_appeal_to_the_court} 
            label='ата направления кассационной жалобы (Х - не требуется) в суд' />

            <Row>
                <Col>
                    <hr></hr>
                    <h4 style={{'textAlign': 'center'}}>III инстаниця</h4>
                </Col>
            </Row>

            <DateInput value={thrinst_date_of_judgment} setValue={setThrinst_date_of_judgment} 
            label='Дата выынесения судебного акта  или дата рассмотрения (только дата)' />
            <TextInput value={thrinst_brief_operative_part} setValue={setThrinst_brief_operative_part} label='Краткая резолютивная часть судебного акта' />
            <TextInput value={thrinst_minfin_information} setValue={setThrinst_minfin_information} 
            label='Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, Х – не требуется' />
            <DateInput value={thrinst_date_of_application_court_acts} setValue={setThrinst_date_of_application_court_acts} 
            label='Дата направления заявления в суд на выдачу судебных актов.' />
            <DateInput value={thrinst_date_of_receipt_acts} setValue={setThrinst_date_of_receipt_acts} 
            label='Дата получения судебных актов.' />
            
            
            <Row>
                <Col>
                    <hr></hr>
                    <h4 style={{'textAlign': 'center'}}>Итоги</h4>
                </Col>
            </Row>

            <TextInput value={date_of_appeal} setValue={setDate_of_appeal}
            label='Дата направления кассационной жалобы в судебную коллегию ВС РФ (Х - не требуется) (1 кассация рассмотрена по существу (ГПК))' />
            <TextInput value={date_of_submission_appeal} setValue={setDate_of_submission_appeal}
            label='НАДЗОР Дата направления надзорной жалобы в президиум ВС РФ (Х - не требуется)' />
            <TextInput value={total_amount_recovered} setValue={setTotal_amount_recovered}
            label='ИТОГОВАЯ сумма взыскания' />
            <TextInput value={information_about_need_recourse} setValue={setInformation_about_need_recourse}
            label='Инф-я о необходимости подачи регресса, надзорной жалобы, Комментарии' />
            <TextInput value={summary_of_court} setValue={setSummary_of_court}
            label='ИТОГ по делу' />


            <Form.Group className="mb-3">
                <Button type="button" >Сохранить</Button>
            </Form.Group>
        </Form>
);}
 
export default CourtForm;