import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

function JSONdateManager ({json, setJson, name}){

    if (json == undefined || json == null){
        setJson({})
    }

    const [newDate, setNewDate] = useState('')
    let last_key = 0
    
    const onDeleteElement = (k)=>{
        let _dates = {...json}
        delete _dates[k]
        setJson({..._dates})
    }

    const onAddElement = (value)=>{
        if (newDate == ''){

        }
        else{
            let _dates = {...json}
            _dates[Number(last_key)+1] = new Date(value).toLocaleDateString('ru-RU')
            setJson({..._dates})
        }
    }


    return (
        <>
        <Form.Label>
        {name}
        </Form.Label>
        <Row className="align-items-center" style={{'marginBottom': '10px'}}>
            <Col xs="auto">
                <Form.Control type='date' value={newDate} onChange={(e)=>setNewDate(e.target.value)}></Form.Control>
            </Col>
            <Col xs="auto">
                <Button variant='secondary' onClick={()=>onAddElement(newDate)}>Добавить</Button>
            </Col>
        </Row>
        
        {Object.keys(json).map((k)=>{
            last_key = k
            return (
                <Row key={k} style={{'marginBottom': '5px'}}>
                    <Col>
                        <Card>
                            <Card.Body>{json[k]} <Button variant="danger" style={{'float': 'right'}} onClick={()=>onDeleteElement(k)}>Удалить</Button></Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        })}
        </>
    );}
 
export default JSONdateManager;