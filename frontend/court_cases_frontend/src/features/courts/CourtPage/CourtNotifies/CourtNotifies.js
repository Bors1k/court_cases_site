import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from '../../../LoadingSpinner'
import FormContainer from "../../../FormContainer";
import NotifiesTable from './NotifiesTable';
import {getNotifiesForCourt} from './notifySlice'

export default function CourtNotifies({court_id}) {
    const dispatch = useDispatch()
    const userAttributes = useSelector(store=>store.auth)
    const notifyStatus = useSelector(store=>store.notify.status)
    const notifies = useSelector(store=>store.notify.notifies)

    useEffect(()=>{
      if(notifyStatus == 'idle'){
        dispatch(getNotifiesForCourt(court_id))
      }
    }, [dispatch,notifyStatus])

  return (<>
    <h4 style={{'textAlign': 'center'}}>Уведомления (Видят только админы и начальники)</h4>
   {
        userAttributes.is_chief || useuserAttributesr.is_admin ? 
        (
          <FormContainer>
            {notifyStatus == 'loading' || notifyStatus == 'idle' 
            ? <LoadingSpinner></LoadingSpinner> 
            : notifies.length != 0 
            ? <NotifiesTable notifies={notifies}/> 
            : <h6 style={{'textAlign': 'center'}}>Нет уведомлений</h6>}
          </FormContainer>
        )
        :<></>
    }
  </>
  )
}
