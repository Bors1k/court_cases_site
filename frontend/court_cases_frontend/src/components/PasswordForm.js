import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { updatePassword } from '../features/user/userSlice'; 
import { useSelector, useDispatch } from 'react-redux'

function PasswordForm() {

    const [open, setOpen] = useState(false);
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [firstPasswordInvalid, setFirstPasswordInvalid] = useState(true);
    const [secondPasswordInvalid, setSecondPasswordInvalid] = useState(true);

    const [incorrRequest, setIncorrRequest] = useState(false);

    const dispatch = useDispatch()
    
    const userStatus = useSelector(state => state.user.status)
    const userErrorMessage = useSelector(state=>state.user.error)

    const onSavePassword = ()=>{
        if (!firstPasswordInvalid && !secondPasswordInvalid){
            dispatch(updatePassword(firstPassword))
        }
        else{
            setIncorrRequest(true)
        }
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
        setSecondPassword(e.target.value)
        if (firstPassword != e.target.value){
            setSecondPasswordInvalid(true)
        }
        else{
            setSecondPasswordInvalid(false)
        }
    }

    useEffect(()=>{
        if (userStatus == 'updated-password'){
            setIncorrRequest(false)
            setFirstPassword('')
            setSecondPassword('')
            setFirstPasswordInvalid(true)
            setSecondPasswordInvalid(true)
            setOpen(false)
        }
    }, [dispatch, userStatus])

  return (
    <>
        {incorrRequest ? <Alert variant='danger'>
                    ???????? ?? ???????????????? ?????????????????? ??????????????.
                </Alert>: <></>}
                <Button
        onClick={() => {setOpen(!open); setIncorrRequest(false)}}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant='secondary'
        >
        ?????????????? ????????????
      </Button>
      <Collapse in={open}>
       <Form noValidate style={{'marginTop': '10px'}}>
            <Form.Group className="mb-3" controlId="formFirstPassword">
                <Form.Label>????????????</Form.Label>
                <Form.Control type="password" 
                isInvalid={firstPasswordInvalid} 
                placeholder="?????????????? ?????????? ????????????"  
                isValid={true} 
                value={firstPassword}
                onChange={onChangeFirstPassword}/>
                <Form.Control.Feedback type="invalid">
                  ???????????? ???? ?????????????????????????? ??????????????????????
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    <ul>
                        <li>?????? ???????????? ???? ???????????? ???????? ?????????????? ?????????? ???? ???????????? ???????????? ????????????????????.</li>
                        <li>?????? ???????????? ???????????? ?????????????????? ???? ?????????? 8 ????????????????.</li>
                        <li>?????? ???????????? ???? ?????????? ???????? ???????????? ???????????????????????? ??????????????.</li>
                        <li>?????? ???????????? ???? ?????????? ???????? ?????????????????? ????????????????.</li>
                    </ul>
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSecondPassword">
                <Form.Label>?????????????????? ????????????</Form.Label>
                <Form.Control type="password" 
                placeholder="?????????????? ?????????? ???????????? ?????? ??????" 
                isValid={true}
                value={secondPassword}
                isInvalid={secondPasswordInvalid}
                onChange={onChangeSecondPassword}/>
                <Form.Control.Feedback type="invalid">
                  ???????????? ???? ??????????????????
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="button" onClick={onSavePassword}>
                ???????????????? ????????????
            </Button>
        </Form>
      </Collapse>
    </>
  )
}

export default PasswordForm