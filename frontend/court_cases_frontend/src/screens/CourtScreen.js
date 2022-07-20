import CourtTable from "../components/CourtTable";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectCourts } from "../features/courts/courtsSlice";
import { useEffect } from "react";
import LoadingSpinner from '../components/LoadingSpinner'
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router-dom";
import CourtForm from "../components/CourtForm";

function CourtScreen (){

    const {court_id} = useParams()
    const courts = useSelector(selectCourts)
    const courtsStatus = useSelector(store=>store.courts.status)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(courtsStatus=='idle'){
            dispatch(getCourts())
        }
        else{

        }
    }, [dispatch, courtsStatus])

    return (
        <FormContainer>
            {courtsStatus == 'loading' || courtsStatus == 'idle' ? <LoadingSpinner/> : (
                <CourtForm court={courts.find(court => court.id == court_id)}></CourtForm>
            )}
        </FormContainer>
    );
    }
     
    export default CourtScreen;