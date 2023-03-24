import CourtTable from "./CourtTable";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectCourtsLength, selectFilteredCourts, selectPaginatedCourts } from "../courtsSlice";
import {clearNotifies} from '../CourtPage/CourtNotifies/notifySlice'
import { useEffect } from "react";
import LoadingSpinner from '../../LoadingSpinner'
import FormContainer from "../../FormContainer";
import CourtTableFilters from "./CourtTableFilters";
import { useNavigate } from "react-router-dom";
import Paginations from "./Paginations";

function CourtsListScreen (){

    const courts_lenght = useSelector(selectCourtsLength)
    const courts = useSelector(selectPaginatedCourts)
    const courtsStatus = useSelector(store=>store.courts.status)
    const courtError = useSelector(store=>store.courts.err)
    const filters = useSelector(store=>store.filter.filters)
    const userToken = useSelector(store=>store.auth.token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        // dispatch(clearNotifies())
        if(courtsStatus=='idle'){
            dispatch(getCourts())
        }
        if(userToken == null || undefined){
            navigate('/login')
        }
    }, [dispatch, courtsStatus, filters, courts, userToken])

    return (
        <FormContainer>
            <CourtTableFilters filters={filters}></CourtTableFilters>
            {courtsStatus == 'loading' || courtsStatus == 'idle' ? <LoadingSpinner></LoadingSpinner> : <CourtTable courts={courts}/>}
            <Paginations courts_lenght={courts_lenght}></Paginations>
        </FormContainer>
    );
    }
     
    export default CourtsListScreen;