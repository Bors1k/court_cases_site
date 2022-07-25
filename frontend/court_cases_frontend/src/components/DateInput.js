import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function DateInput({value, setValue ,label, readOnly = false}) {

    // if (value == ''){
    //     setValue(null)
    // }

    const onSetValue = (e)=>{
        setValue(e.target.value)
    }

  return (
    <Form.Group className="mb-3" controlId={value}>
        <Form.Label>
            {label}
        </Form.Label>
        <Row>
            <Col xs="auto">
                <Form.Control type="date" placeholder="" readOnly={readOnly} value={value == null ? '' : value} onChange={onSetValue}/>
            </Col>   
        </Row>
    </Form.Group>
  )
}
