import CourtTable from "../components/CourtTable";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectCourts } from "../features/courts/courtsSlice";
import { selectFio } from "../features/auth/authSlice"
import { useEffect } from "react";
import LoadingSpinner from '../components/LoadingSpinner'
import FormContainer from "../components/FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import CreateCourtForm from "../components/CreateCourtForm";
import AlertMessage from '../components/AlertMessage'

export default function CreateCourtScreen() {

    const user_fio = useSelector(store=>store.auth.fio)
    const courtsStatus = useSelector(store=>store.courts.status)
    const errorMessage = useSelector(store=>store.courts.err)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
        if(courtsStatus == 'court-created'){
            navigate('/courts/')
        }
    }, [courtsStatus, dispatch])

  return (
    <FormContainer>
        {courtsStatus == 'error' ? <AlertMessage title={'Ошибка создания дела'} text={errorMessage}></AlertMessage>: <></>}
        <CreateCourtForm user_fio={user_fio}></CreateCourtForm>
    </FormContainer>
  )
}
