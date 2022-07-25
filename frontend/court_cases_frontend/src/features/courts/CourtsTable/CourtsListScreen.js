import CourtTable from "./CourtTable";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectFilteredCourts } from "../courtsSlice";
import { useEffect } from "react";
import LoadingSpinner from '../../LoadingSpinner'
import FormContainer from "../../FormContainer";
import CourtTableFilters from "./CourtTableFilters";

function CourtsListScreen (){

    const courts = useSelector(selectFilteredCourts)
    const courtsStatus = useSelector(store=>store.courts.status)
    const filters = useSelector(store=>store.filter.filters)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(courtsStatus=='idle'){
            dispatch(getCourts())
        }
    }, [dispatch, courtsStatus, filters, courts])

    return (
        <FormContainer>
            <CourtTableFilters filters={filters}></CourtTableFilters>
            {courtsStatus == 'loading' || courtsStatus == 'idle' ? <LoadingSpinner></LoadingSpinner> : <CourtTable courts={courts}/>}
        </FormContainer>
    );
    }
     
    export default CourtsListScreen;