import FormContainer from "../FormContainer";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {signin, signinAsync} from '../auth/authSlice'
import axiosInstance from '../services/axios/index'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Container } from "react-bootstrap";
import AlertMessage from "../AlertMessage";

function LoginScreen() {
    const userLogin = useSelector((state)=>state.auth)
    // const userLoginError = useSelector(state=>state.auth.erorr)
    
    let navigate = useNavigate();
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const onSignIn = async (e) => {
        e.preventDefault()
        dispatch(signinAsync({username: email, password}))
    }

    useEffect(()=>{
    
    }, [userLogin.error,])

    return (
        <Container>
            { userLogin.error != null ? <AlertMessage title={'Ошибка авторизации'} text={userLogin.error}/> : <></>}
            { !userLogin.token ? (
                <FormContainer>
                    <Form  onSubmit={onSignIn}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control required type="email" placeholder="Введите email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <Form.Text className="text-muted">
                            Та почта, которая ФамилияИО@fsfk.local
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control required type="password" placeholder="Введите пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Войти
                        </Button>
                    </Form>
                </FormContainer>
                ): (
                    <Container>
                        Вы уже авторизованы. Перейти к <Link to="/courts">Делам</Link> или в <Link to="/profile">Профиль</Link>
                    </Container>
                )}
        </Container>
 )
}
export default LoginScreen;