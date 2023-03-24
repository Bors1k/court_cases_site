import CourtTable from "../CourtsTable/CourtTable";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectCourts } from "../courtsSlice";
import { useEffect } from "react";
import LoadingSpinner from '../../LoadingSpinner'
import FormContainer from "../../FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import CourtForm from "./CourtForm";
import AlertMessage from '../../AlertMessage'
import {clearNotifies} from '../CourtPage/CourtNotifies/notifySlice'

function CourtScreen (){

    const {court_id} = useParams()
    const courts = useSelector(selectCourts)
    const courtsStatus = useSelector(store=>store.courts.status)
    const errorMessage = useSelector(store=>store.courts.err)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(clearNotifies())
        if(courtsStatus=='idle'){
            dispatch(getCourts())
        }
        else if(courtsStatus=='update-succeded'){
            dispatch(getCourts())
            navigate('/courts/')
        }
    }, [dispatch, courtsStatus])

    return (
        <FormContainer>
            {courtsStatus == 'error' ? <AlertMessage title={'Ошибка создания дела'} text={errorMessage}></AlertMessage>: <></>}
            {courtsStatus == 'loading' || courtsStatus == 'idle' ? <LoadingSpinner/> : (
                <CourtForm court={courts.find(court => court.id == court_id)}></CourtForm>
            )}
        </FormContainer>
    );
    }
     
    export default CourtScreen;