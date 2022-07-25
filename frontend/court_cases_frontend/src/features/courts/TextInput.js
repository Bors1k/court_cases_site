import React from 'react'
import Form from 'react-bootstrap/Form';


export default function TextInput({value, setValue ,label, readOnly = false, isValid=false, required=false, type= 'text'}) {
  return (
    <Form.Group className="mb-3" controlId={value}>
                {required? <Form.Label style={{'fontWeight': 'bold'}}>
                    {label}
                </Form.Label>: <Form.Label>
                    {label}
                </Form.Label>}
                <Form.Control type={type} placeholder="" readOnly={readOnly} isValid={isValid} required={required} value={value} onChange={(e)=>setValue(e.target.value)}/>
    </Form.Group>
  )
}


