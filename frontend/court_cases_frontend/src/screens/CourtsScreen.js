import CourtTable from "../components/CourtTable";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, selectCourts } from "../features/courts/courtsSlice";
import { useEffect } from "react";

function CourtsScreen (){

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
        <Container>
            <CourtTable/>
        </Container>
    );
    }
     
    export default CourtsScreen;