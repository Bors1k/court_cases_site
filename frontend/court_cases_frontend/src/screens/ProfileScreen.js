// import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormContainer from "../components/FormContainer";
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfileInfoAsync } from '../features/user/userSlice'

function ProfileScreen (){
    
    const dispatch = useDispatch()
    
    dispatch(getProfileInfoAsync())
    
    const userProfile = useSelector((state)=>state.user)
    
    const [name, setName] = useState(userProfile.name)
    const [surename, setSurename] = useState(userProfile.surename)
    const [patronymic, setPatronymic] = useState(userProfile.patronymic)
    const [email, setEmail] = useState(userProfile.email)

    const [isAdmin, setIsAdmin] = useState(userProfile.is_admin)
    const [isChief, setIsChief] = useState(userProfile.is_chief)

    const [password, setPassword] = useState('')
    
    // useEffect(()=>{
        
    // })

    return (
        <FormContainer>
            <Form style={{'marginTop': '10px'}}>
            <Form.Group as={Row} className="mb-3" controlId="formPlainTextName">
                    <Form.Label column sm="2">
                    Имя
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Col>
                </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlainTextSurename">
                    <Form.Label column sm="2">
                    Фамилия
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type='text' value={surename} onChange={(e)=>setSurename(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlainTextPatron">
                    <Form.Label column sm="2">
                    Отчество
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type='text' value={patronymic} onChange={(e)=>setPatronymic(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control plaintext readOnly defaultValue={email} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Пароль
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Введите новый пароль" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextAgainPassword">
                    <Form.Label column sm="2">
                    Пароль еще раз
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Введите новый пароль" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="Switches">
                    <Col sm="10">
                        <Form.Check 
                        checked={isAdmin}
                        disabled
                        type="switch"
                        label="Админ?"
                        id="isAdminSwitch"
                        />
                    </Col>
                    <Col sm="10">
                        <Form.Check 
                        checked={isChief}
                        disabled
                        type="switch"
                        label="Начальник?"
                        id="isStaffSwitch"
                        />
                    </Col>
                </Form.Group>
            
                <Button variant="primary" type="submit">
                    Сохранить
                </Button>
            </Form>

        </FormContainer>
    );
    }
     
    export default ProfileScreen;