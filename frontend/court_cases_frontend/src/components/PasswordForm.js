import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

function PasswordForm({children}) {
    const [open, setOpen] = useState(false);
    const [firstPassword, setFirstPassword] = useState('');
    const [firstPasswordInvalid, setFirstPasswordInvalid] = useState(false);
    // const [secondPassword, setSecondPassword] = useState('');
    const [secondPasswordInvalid, setSecondPasswordInvalid] = useState(false);

    const onSavePassword = ()=>{
        setFirstPassword('')
        setFirstPasswordInvalid(false)
        setSecondPassword('')
        setSecondPasswordInvalid(false)
        setOpen(false)
    }
    var numericRe = new RegExp('[0-9]*')
    const onChangeFirstPassword = (e)=>{
        setFirstPassword(e.target.value)
        if ((e.target.value).length < 8 || numericRe.exec(e.target.value)[0].length == (e.target.value).length) {
            setFirstPasswordInvalid(true)
        }
        else {
            setFirstPasswordInvalid(false)
        }
    }

    const onChangeSecondPassword = (e)=>{
        if (firstPassword != e.target.value){
            setSecondPasswordInvalid(true)
        }
        else{
            setSecondPasswordInvalid(false)
        }
    }

  return (
    <>
        <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant='secondary'
        >
        Сменить пароль
      </Button>
      <Collapse in={open}>
       <Form noValidate style={{'marginTop': '10px'}}>
            <Form.Group className="mb-3" controlId="formFirstPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" 
                isInvalid={firstPasswordInvalid} 
                placeholder="Введите новый пароль"  
                isValid={true} 
                onChange={onChangeFirstPassword}/>
                <Form.Control.Feedback type="invalid">
                  Пароль не соответствует требованиям
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    <ul>
                        <li>Ваш пароль не должен быть слишком похож на другую личную информацию.</li>
                        <li>Ваш пароль должен содержать не менее 8 символов.</li>
                        <li>Ваш пароль не может быть широко используемым паролем.</li>
                        <li>Ваш пароль не может быть полностью числовым.</li>
                    </ul>
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSecondPassword">
                <Form.Label>Повторите пароль</Form.Label>
                <Form.Control type="password" 
                placeholder="Введите новый пароль еще раз" 
                isValid={true}
                isInvalid={secondPasswordInvalid}
                onChange={onChangeSecondPassword}/>
                <Form.Control.Feedback type="invalid">
                  Пароли не совпадают
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="button" onClick={onSavePassword}>
                Обновить пароль
            </Button>
        </Form>
      </Collapse>
    </>
  )
}

export default PasswordForm