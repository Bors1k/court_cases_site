import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap'

function CourtTable ({courts}){
    // console.log(courts)
    // courts.map((court)=>{
    //     console.log(court)
    // })
    

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>№ п\п</th>
                    <th>Куратор</th>
                    <th>Кем заявлены требования и (сумма заявленных требований)</th>
                    <th>К кому заявлены требования + (3 лицо)</th>
                    <th>Исковые требования</th>
                    <th>N дела в суде первой инстанции</th>
                    <th>N дела по внутренней номенкла туре</th>
                </tr>
            </thead>
            <tbody>
                {courts.map((court)=>{
                    return (
                    <LinkContainer key={court.id} to={`/courts/${court.id}`} style={{'cursor': 'pointer'}}>
                    <tr>
                        <td>{court.number_of_court}</td>
                        <td>{court.user_name}</td>
                        <td>{court.case_source_and_summ}</td>
                        <td>{court.case_purpose}</td>
                        <td>{court.claim}</td>
                        <td>{court.number_case_in_first_instance}</td>
                        <td>{court.number_case_in_numenklature}</td>
                    </tr>
                    </LinkContainer>)
                })}
            </tbody>
        </Table>
);}
 
export default CourtTable;