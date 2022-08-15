import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import NotifiesRow from './NotifiesRow'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function NotifiesTable ({notifies}){

//    const courtsStatus = useSelector(store=>store.courts.status)

    const dispatch = useDispatch()

    useEffect(()=>{
    
    }, [dispatch])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Текс сообщения</th>
                    <th>Дата следующего уведомления</th>
                    {/* <th>Отправлено уже N раз</th> */}
                    <th>Дата уведомления начальства</th>
                </tr>
            </thead>
            <tbody>
                {notifies.map((notify)=>{
                    return (<NotifiesRow notify={notify} key={notify.id}></NotifiesRow>)})}
            </tbody>
        </Table>
);}
 
export default NotifiesTable;