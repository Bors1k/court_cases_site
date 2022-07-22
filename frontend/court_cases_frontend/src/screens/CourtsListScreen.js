import CourtTable from "../components/CourtTable";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectCourts } from "../features/courts/courtsSlice";
import { useEffect } from "react";
import LoadingSpinner from '../components/LoadingSpinner'
import FormContainer from "../components/FormContainer";

function CourtsListScreen (){

    const courts = useSelector(selectCourts)
    const courtsStatus = useSelector(store=>store.courts.status)
    const filters = useSelector(store=>store.courts.filters)

    // const [order ]

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
            {courtsStatus == 'loading' || courtsStatus == 'idle' ? <LoadingSpinner></LoadingSpinner> : <CourtTable courts={courts}/>}
        </FormContainer>
    );
    }
     
    export default CourtsListScreen;