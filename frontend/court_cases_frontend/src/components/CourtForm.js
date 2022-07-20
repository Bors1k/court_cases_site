import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import JSONdateManager from './JSONdateManager'

function CourtForm ({court}){   
    const [courtNumber, setCourtNumber] = useState(court.number_of_court)
    const [case_source_and_summ, setCase_source_and_summ] = useState(court.case_source_and_summ)
    const [case_purpose, setCase_purpose] = useState(court.case_purpose)
    const [claim, setClaim] = useState(court.claim)
    const [number_case_in_first_instance, setNumber_case_in_first_instance] = useState(court.number_case_in_first_instance)
    const [number_case_in_numenklature, setNumber_case_in_numenklature] = useState(court.number_case_in_numenklature)
    
    const [fstinst_dates_of_court_hearing, setFstinst_dates_of_court_hearing] = useState(court.fstinst_dates_of_court_hearing)

    return (
        <Form>
            <Row>
                <Col>
                    <h4 style={{'textAlign': 'center'}}>Начало дела</h4>
                    {/* <hr></hr> */}
                </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="court_number">
                <Form.Label>
                    Номер дела
                </Form.Label>
                    <Form.Control type="text" placeholder="Номер дела" value={courtNumber} onChange={(e)=>setCourtNumber(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="user_name">
                <Form.Label>
                    Куратор
                </Form.Label>
                    <Form.Control type="text" placeholder="Куратор" readOnly  value={court.user_name}/>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="case_source_and_summ">
                <Form.Label>
                    Кем заявлены требования и (сумма заявленных требований):
                </Form.Label>
                    <Form.Control type="text"
                    value={case_source_and_summ} onChange={(e)=>setCase_source_and_summ(e.target.value  )} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="case_purpose">
                <Form.Label>
                    К кому заявлены требования + (3 лицо)
                </Form.Label>
                    <Form.Control type="text"
                    value={case_purpose} onChange={(e)=>setCase_purpose(e.target.value)} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="claim">
                <Form.Label>
                    Исковые требования
                </Form.Label>
                    <Form.Control type="text"
                    value={claim} onChange={(e)=>setClaim(e.target.value)} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="number_case_in_first_instance">
                <Form.Label>
                    N дела в суде первой инстанции
                </Form.Label>
                    <Form.Control type="text"
                    value={number_case_in_first_instance} onChange={(e)=>setNumber_case_in_first_instance(e.target.value)} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="number_case_in_numenklature">
                <Form.Label>
                    N дела по внутренней номенклатуре
                </Form.Label>
                    <Form.Control type="text"
                    value={number_case_in_numenklature} onChange={(e)=>setNumber_case_in_numenklature(e.target.value)} />
            </Form.Group>
            <Row>
                <Col>
                    <hr></hr>
                    <h4 style={{'textAlign': 'center'}}>I инстаниця</h4>
                    {/* <hr></hr> */}
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="fstinst_dates_of_court_hearing">
                <JSONdateManager key={1} json={fstinst_dates_of_court_hearing} 
                setJson={setFstinst_dates_of_court_hearing}
                name="Даты судебных заседаний"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Button type="button" >Сохранить</Button>
            </Form.Group>
        </Form>
);}
 
export default CourtForm;