import CourtTable from "./CourtTable";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectFilteredCourts } from "../courtsSlice";
import {clearNotifies} from '../CourtPage/CourtNotifies/notifySlice'
import { useEffect } from "react";
import LoadingSpinner from '../../LoadingSpinner'
import FormContainer from "../../FormContainer";
import CourtTableFilters from "./CourtTableFilters";
import { useNavigate } from "react-router-dom";

function CourtsListScreen (){

    const courts = useSelector(selectFilteredCourts)
    const courtsStatus = useSelector(store=>store.courts.status)
    const courtError = useSelector(store=>store.courts.err)
    const filters = useSelector(store=>store.filter.filters)
    const userToken = useSelector(store=>store.auth.token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(clearNotifies())
        if(courtsStatus=='idle'){
            dispatch(getCourts())
        }
        if(userToken == null || undefined){
            navigate('/login')
        }
        if(courtError == 'Request failed with status code 403' && userToken){
            dispatch(getCourts())
        }
    }, [dispatch, courtsStatus, filters, courts, userToken])

    return (
        <FormContainer>
            <CourtTableFilters filters={filters}></CourtTableFilters>
            {courtsStatus == 'loading' || courtsStatus == 'idle' ? <LoadingSpinner></LoadingSpinner> : <CourtTable courts={courts}/>}
        </FormContainer>
    );
    }
     
    export default CourtsListScreen;