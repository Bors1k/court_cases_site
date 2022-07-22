import React from 'react'
import Form from 'react-bootstrap/Form';


export default function TextInput({value, setValue ,label, readOnly = false}) {
  return (
    <Form.Group className="mb-3" controlId={value}>
                <Form.Label>
                    {label}
                </Form.Label>
                <Form.Control type="text" placeholder="" readOnly={readOnly} value={value} onChange={(e)=>setValue(e.target.value)}/>
    </Form.Group>
  )
}


