import CourtTable from "../CourtsTable/CourtTable";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectCourts } from "../courtsSlice";
import { selectFio } from "../../auth/authSlice"
import { useEffect } from "react";
import LoadingSpinner from '../../LoadingSpinner'
import FormContainer from "../../FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import CreateCourtForm from "./CreateCourtForm";
import AlertMessage from '../../AlertMessage'

export default function CreateCourtScreen() {

    const user_fio = useSelector(store=>store.auth.fio)
    const token = useSelector(store=>store.auth.token)
    const courtsStatus = useSelector(store=>store.courts.status)
    const errorMessage = useSelector(store=>store.courts.err)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
        if(courtsStatus == 'court-created'){
            navigate('/courts/')
        }
        if(token == null || undefined){
          navigate('/login')
      }
        if(errorMessage == 'Request failed with status code 403' && token){
          
        }
    }, [courtsStatus, dispatch, token])

  return (
    <FormContainer>
        {courtsStatus == 'error' ? <AlertMessage title={'Ошибка создания дела'} text={errorMessage}></AlertMessage>: <></>}
        <CreateCourtForm user_fio={user_fio}></CreateCourtForm>
    </FormContainer>
  )
}
