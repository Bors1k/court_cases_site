import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import CourtRow from './CourtRow'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './CourtTableStyles.css'

function CourtTable ({courts}){
    const [ordering, setOrdering] = useState(true)

    const courtsStatus = useSelector(store=>store.courts.status)

    const dispatch = useDispatch()

    useEffect(()=>{
    
    }, [dispatch, courtsStatus])

    return (
        <div className='overflow-auto'>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th rowSpan={2} onClick={()=>setOrdering(!ordering)} style={{'cursor': 'pointer'}} className={'tableheader'}>№ п\п</th>
                    <th rowSpan={2} className={'tableheader'}>Куратор</th>
                    <th rowSpan={2} className={'tableheader'}>Кем заявлены требования и (сумма заявленных требований)</th>
                    <th rowSpan={2} className={'tableheader'}>К кому заявлены требования + (3 лицо)</th>
                    <th rowSpan={2} className={'tableheader'}>Исковые требования</th>
                    <th rowSpan={2} className={'tableheader'}>N дела в суде первой инстанции</th>
                    <th rowSpan={2} className={'tableheader'}>N дела по внутренней номенклатуре</th>

                    <th rowSpan={2} className={'tableheader'}>Даты судебных заседаний</th>
                    <th colSpan={2} className={'tableheader'}>I Инстанция</th>

                    <th rowSpan={2} className={'tableheader'}>Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, X – не требуется</th>
                    <th rowSpan={2} className={'tableheader'}>Дата направления заявления в суд на выдачу судебного акта</th>
                    <th rowSpan={2} className={'tableheader'}>Дата получения судебного решения</th>
                    <th colSpan={2} className={'tableheader'}>Дата направления апелляционной жалобы</th>

                    <th rowSpan={2} className={'tableheader'}>Даты судебных заседаний</th>
                    <th colSpan={2} className={'tableheader'}>II Инстанция</th>
                    <th rowSpan={2} className={'tableheader'}>Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, Х – не требуется</th>
                    <th rowSpan={2} className={'tableheader'}>Дата направления заявления в суд на выдачу судебных актов</th>
                    <th rowSpan={2} className={'tableheader'}>Дата получения судебных актов вступивших в законную силу</th>
                    <th colSpan={2} className={'tableheader'}>Дата направления кассационной жалобы (Х - не требуется)</th>
                    
                    <th colSpan={2} className={'tableheader'}> III Инстанция</th>
                    
                    <th rowSpan={2} className={'tableheader'}>Информация о направлении справки по делу в ФК или Минфин V –отправлена, дата отправления и № письма, Х – не требуется</th>
                    <th rowSpan={2} className={'tableheader'}>Дата направления заявления в суд на выдачу судебных актов</th>
                    <th rowSpan={2} className={'tableheader'}>Дата получения судебных актов</th>

                    <th rowSpan={2} className={'tableheader'}>Дата направления кассационной жалобы в судебную коллегию ВС РФ (Х - не требуется) (1 кассация рассмотрена по существу (ГПК))</th>
                    <th rowSpan={2} className={'tableheader'}>НАДЗОР Дата направления надзорной жалобы в президиум ВС РФ (Х - не требуется)</th>
                    <th rowSpan={2} className={'tableheader'}>ИТОГОВАЯ сумма взыскания</th>
                    <th rowSpan={2} className={'tableheader'}>Инф-я о необходимости подачи регресса, надзорной жалобы, Комментарии</th>
                    <th rowSpan={2} className={'tableheader'}>ИТОГ по делу</th>
                </tr> 
                <tr>
                    <td className={'tableheader'}> Дата вынесения решения(только дата)</td>
                    <td className={'tableheader'}> Краткая резолютивная часть судебного акта</td>

                    <td className={'tableheader'}>сторонам по делу</td>
                    <td className={'tableheader'}>в суд</td>

                    <td className={'tableheader'}>Дата вынесения апелляционного определения</td>
                    <td className={'tableheader'}>Краткая резолютивная часть судебного акта</td>

                    <td className={'tableheader'}>сторонами по делу</td>
                    <td className={'tableheader'}>в суд</td>

                    <td className={'tableheader'}>Дата вынесения судебного акта или дата рассмотрения (только дата)</td>
                    <td className={'tableheader'}>Краткая резолютивная часть судебного акта</td>
                </tr>
            </thead>
            <tbody>
                {ordering ? (courts.map((court)=>{
                    return (<CourtRow key={court.id} court={court}></CourtRow>)
                })): ([...courts].reverse().map((court)=>{
                    return (<CourtRow key={court.id} court={court}></CourtRow>)}))}
            </tbody>
        </Table>
        </div>
);}
 
export default CourtTable;