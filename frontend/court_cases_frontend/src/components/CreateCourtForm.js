import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import DateInput from './DateInput';
import JSONdateManager from './JSONdateManager'
import TextInput from './TextInput';
import { createCourt } from "../features/courts/courtsSlice";

function CreateCourtForm ({user_fio}){

    const dispatch = useDispatch()

    const [number_of_court, setNumber_of_court] = useState('')
    const [case_source_and_summ, setCase_source_and_summ] = useState('')
    const [case_purpose, setCase_purpose] = useState('')
    const [claim, setClaim] = useState('')
    const [number_case_in_first_instance, setNumber_case_in_first_instance] = useState('')
    const [number_case_in_numenklature, setNumber_case_in_numenklature] = useState('')
    
    const [fstinst_dates_of_court_hearing, setFstinst_dates_of_court_hearing] = useState({})
    const [fstinst_date_of_dicision, setFstinst_date_of_dicision] = useState(null)
    const [fstinst_brief_operative_part, setFstinst_brief_operative_part] = useState('')
    const [fstinst_minfin_information, setFstinst_minfin_information] = useState('')
    const [fstinst_date_of_filing_in_court, setFstinst_date_of_filing_in_court] = useState(null)
    const [fstinst_date_of_receipt_of_judgment, setFstinst_date_of_receipt_of_judgment] = useState(null)
    const [fstinst_date_appeal_by_the_parties, setFstinst_date_appeal_by_the_parties] = useState(null)
    const [fstinst_date_appeal_to_the_court, setFstinst_date_appeal_to_the_court] = useState(null)

    
    const [sndinst_dates_of_court_hearing, setSndinst_dates_of_court_hearing] = useState({})
    const [sndinst_date_of_dicision, setSndinst_date_of_dicision] = useState(null)
    const [sndinst_brief_operative_part, setSndinst_brief_operative_part] = useState('')
    const [sndinst_minfin_information, setSndinst_minfin_information] = useState('')
    const [sndinst_date_of_filing_in_court, setSndinst_date_of_filing_in_court] = useState(null)
    const [sndinst_date_of_receipt_of_judgment, setSndinst_date_of_receipt_of_judgment] = useState(null)
    const [sndinst_date_appeal_by_the_parties, setSndinst_date_appeal_by_the_parties] = useState(null)
    const [sndinst_date_appeal_to_the_court, setSndinst_date_appeal_to_the_court] = useState(null)
    

    const [thrinst_date_of_judgment, setThrinst_date_of_judgment] = useState(null)
    const [thrinst_brief_operative_part, setThrinst_brief_operative_part] = useState('')
    const [thrinst_minfin_information, setThrinst_minfin_information] = useState('')
    const [thrinst_date_of_application_court_acts, setThrinst_date_of_application_court_acts] = useState(null)
    const [thrinst_date_of_receipt_acts, setThrinst_date_of_receipt_acts] = useState(null)


    const [date_of_appeal, setDate_of_appeal] = useState('')
    const [date_of_submission_appeal, setDate_of_submission_appeal] = useState('')
    const [total_amount_recovered, setTotal_amount_recovered] = useState('')
    const [information_about_need_recourse, setInformation_about_need_recourse] = useState('')
    const [summary_of_court, setSummary_of_court] = useState('')

    const onCreateCourt = (e)=>{
        e.preventDefault()
        const court_create = {
            number_of_court,
            case_source_and_summ,
            case_purpose,
            claim,
            number_case_in_first_instance,
            number_case_in_numenklature,

            fstinst_dates_of_court_hearing,
            fstinst_date_of_dicision,
            fstinst_brief_operative_part,
            fstinst_minfin_information,
            fstinst_date_of_filing_in_court,
            fstinst_date_of_receipt_of_judgment,
            fstinst_date_appeal_by_the_parties,
            fstinst_date_appeal_to_the_court,
            
            sndinst_dates_of_court_hearing,
            sndinst_date_of_dicision,
            sndinst_brief_operative_part,
            sndinst_minfin_information,
            sndinst_date_of_filing_in_court,
            sndinst_date_of_receipt_of_judgment,
            sndinst_date_appeal_by_the_parties,
            sndinst_date_appeal_to_the_court,

            thrinst_date_of_judgment,
            thrinst_brief_operative_part,
            thrinst_minfin_information,
            thrinst_date_of_application_court_acts,
            thrinst_date_of_receipt_acts,

            date_of_appeal,
            date_of_submission_appeal,
            total_amount_recovered,
            information_about_need_recourse,
            summary_of_court
        }

        dispatch(createCourt(court_create))
    }

    return (
        <Form onSubmit={onCreateCourt}>
            <Row>
                <Col>
                    <h4 style={{'textAlign': 'center'}}>Начало дела</h4>
                </Col>
            </Row>
            <TextInput type='number' value={number_of_court} setValue={setNumber_of_court} label='Номер дела'/>
            <TextInput required value={user_fio} label='Куратор' readOnly/>
            <TextInput required value={case_source_and_summ} setValue={setCase_source_and_summ} 
            label='Кем заявлены требования и (сумма заявленных требований):' />
            <TextInput required value={case_purpose} setValue={setCase_purpose} label='К кому заявлены требования + (3 лицо)' />
            <TextInput required value={claim} setValue={setClaim} label='Исковые требования' />
            <TextInput required value={number_case_in_first_instance} setValue={setNumber_case_in_first_instance} label='N дела в суде первой инстанции' />
            <TextInput required value={number_case_in_numenklature} setValue={setNumber_case_in_numenklature} label='N дела по внутренней номенклатуре' />
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
                <Button type="submit">Сохранить</Button>
            </Form.Group>
        </Form>
);}
 
export default CreateCourtForm;
