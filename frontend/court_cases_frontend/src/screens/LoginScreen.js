import FormContainer from "../components/FormContainer";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {signin, signinAsync} from '../features/auth/authSlice'
import axiosInstance from '../services/axios/index'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Container } from "react-bootstrap";

function LoginScreen() {
    const userLogin = useSelector((state)=>state.auth)
    let navigate = useNavigate();
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const onSignIn = async (e) => {
        e.preventDefault()
        dispatch(signinAsync({username: email, password}))
    }

    useEffect(()=>{
        // if (userLogin.token != null){
        //     navigate('/')
        // }
    })

    return (
        <Container>
            { !userLogin.token ? (
                <FormContainer>
                    <Form style={{"marginTop": "10px"}} onSubmit={onSignIn}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control type="email" placeholder="Введите email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <Form.Text className="text-muted">
                            Та почта, которая ФамилияИО@fsfk.local
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Войти
                        </Button>
                    </Form>
                </FormContainer>
                ): (
                    <Container>
                        Вы уже авторизованы. Перейти к <Link to="/">Делам</Link> или в <Link to="/profile">Профиль</Link>
                    </Container>
                )}
        </Container>
 )
}
export default LoginScreen;