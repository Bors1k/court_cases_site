import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import CourtRow from './CourtRow'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function CourtTable ({courts}){
   const [ordering, setOrdering] = useState(false)

   const courtsStatus = useSelector(store=>store.courts.status)

    const dispatch = useDispatch()

    useEffect(()=>{
    
    }, [dispatch, courtsStatus])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th onClick={()=>setOrdering(!ordering)} style={{'cursor': 'pointer'}}>№ п\п</th>
                    <th>Куратор</th>
                    <th>Кем заявлены требования и (сумма заявленных требований)</th>
                    <th>К кому заявлены требования + (3 лицо)</th>
                    <th>Исковые требования</th>
                    <th>N дела в суде первой инстанции</th>
                    <th>N дела по внутренней номенкла туре</th>
                </tr>
            </thead>
            <tbody>
                {ordering ? (courts.map((court)=>{
                    return (<CourtRow key={court.id} court={court}></CourtRow>)
                })): ([...courts].reverse().map((court)=>{
                    return (<CourtRow key={court.id} court={court}></CourtRow>)}))}
            </tbody>
        </Table>
);}
 
export default CourtTable;