import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormContainer from "../components/FormContainer";
import AlertButton from '../components/AlertButton'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfileInfoAsync, selectUser, updateProfile } from '../features/user/userSlice'
import PasswordForm from '../components/PasswordForm';


function ProfileScreen (){
    
    const dispatch = useDispatch()
    
    const userProfile = useSelector(selectUser)

    const userStatus = useSelector(state => state.user.status)
    const userErrorMessage = useSelector(state=>state.user.error)

    const [name, setName] = useState(userProfile.name)
    const [surename, setSurename] = useState(userProfile.surename)
    const [patronymic, setPatronymic] = useState(userProfile.patronymic)
    const [email, setEmail] = useState(userProfile.email)

    const [isAdmin, setIsAdmin] = useState(userProfile.is_admin)
    const [isChief, setIsChief] = useState(userProfile.is_chief)

    const [validForm, setValidForm] = useState(false)

    const onRefreshProfile = ()=> dispatch(getProfileInfoAsync()) 

    const onUpdateProfile = () => {
        dispatch(updateProfile({name, surename, patronymic}))
    }
    
    useEffect(()=>{
        if (userStatus=='idle'){
            dispatch(getProfileInfoAsync())
        }
        else if (userStatus == 'succeded-info'){
            setName(userProfile.name)
            setSurename(userProfile.surename)
            setPatronymic(userProfile.patronymic)
            setEmail(userProfile.email)
            setIsAdmin(userProfile.is_admin)
            setIsChief(userProfile.is_chief)
        }
        else if(userStatus == 'updated-profile'){
            setName(userProfile.name)
            setSurename(userProfile.surename)
            setPatronymic(userProfile.patronymic)
        }
        
    }, [userStatus, dispatch])

    return (
        <FormContainer>
            { userStatus == 'failed' ? 
                    <AlertButton message={userErrorMessage} onRefresh={onRefreshProfile}></AlertButton>
                    :
                    (<></>)
                }
            <Form noValidate validated={validForm} style={{'marginTop': '10px'}} onChange={()=>setValidForm(true)}>
            <Form.Group as={Row} className="mb-3" controlId="formPlainTextSurename">
                    <Form.Label column sm="2">
                    Фамилия
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control required type='text' value={surename} onChange={(e)=>setSurename(e.target.value)}/>
                    </Col>
                </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlainTextName">
                    <Form.Label column sm="2">
                    Имя
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control 
                    required
                    type='text'
                    value={name} 
                    onChange={e => setName(e.target.value)}/>
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
                <Button variant="primary" className='mb-3' type="button" onClick={onUpdateProfile}>
                    Сохранить
                </Button> 
                
            </Form>

            <PasswordForm/>
        </FormContainer>

        
    );
    }
     
    export default ProfileScreen;