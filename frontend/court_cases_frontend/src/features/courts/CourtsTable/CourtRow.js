import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import DateFormat from './DateFormat'

export default function CourtRow({court}) {
  return (
    <LinkContainer to={`/courts/${court.id}`} style={{'cursor': 'pointer'}}>
        <tr>
            <td className='tablerow'>{court.id}</td>
            <td className='tablerow'>{court.user_name}</td>
            <td className='tablerow'>{court.case_source_and_summ}</td>
            <td className='tablerow'>{court.case_purpose}</td>
            <td className='tablerow'>{court.claim}</td>
            <td className='tablerow'>{court.number_case_in_first_instance}</td>
            <td className='tablerow'>{court.number_case_in_numenklature}</td>
            <td className='tablerow'>{
            Object.keys(court.fstinst_dates_of_court_hearing).map((k)=>{
              return court.fstinst_dates_of_court_hearing[k] + ' '
            })}</td>

            <td className='tablerow'><DateFormat str_date={court.fstinst_date_of_dicision}/></td>
            <td className='tablerow'>{court.fstinst_brief_operative_part}</td>
            <td className='tablerow'>{court.fstinst_minfin_information}</td>
            <td className='tablerow'><DateFormat str_date={court.fstinst_date_of_filing_in_court}/></td>
            <td className='tablerow'><DateFormat str_date={court.fstinst_date_of_receipt_of_judgment}/></td>
            <td className='tablerow'><DateFormat str_date={court.fstinst_date_appeal_by_the_parties}/></td>
            <td className='tablerow'><DateFormat str_date={court.fstinst_date_appeal_to_the_court}/></td>

            <td className='tablerow'>{
            Object.keys(court.sndinst_dates_of_court_hearing).map((k)=>{
              return court.sndinst_dates_of_court_hearing[k] + ' '
            })}</td>
            <td className='tablerow'><DateFormat str_date={court.sndinst_date_of_dicision}/></td>
            <td className='tablerow'>{court.sndinst_brief_operative_part}</td>
            <td className='tablerow'>{court.sndinst_minfin_information}</td>
            <td className='tablerow'><DateFormat str_date={court.sndinst_date_of_filing_in_court}/></td>
            <td className='tablerow'><DateFormat str_date={court.sndinst_date_of_receipt_of_judgment}/></td>
            <td className='tablerow'><DateFormat str_date={court.sndinst_date_appeal_by_the_parties}/></td>
            <td className='tablerow'><DateFormat str_date={court.sndinst_date_appeal_to_the_court}/></td>

            <td className='tablerow'><DateFormat str_date={court.thrinst_date_of_judgment}/></td>
            <td className='tablerow'>{court.thrinst_brief_operative_part}</td>
            <td className='tablerow'>{court.thrinst_minfin_information}</td>
            <td className='tablerow'><DateFormat str_date={court.thrinst_date_of_application_court_acts}/></td>
            <td className='tablerow'><DateFormat str_date={court.thrinst_date_of_receipt_acts}/></td>

            <td className='tablerow'>{court.date_of_appeal}</td>
            <td className='tablerow'>{court.date_of_submission_appeal}</td>
            <td className='tablerow'>{court.total_amount_recovered}</td>
            <td className='tablerow'>{court.information_about_need_recourse}</td>
            <td className='tablerow'>{court.summary_of_court}</td>
        </tr>
    </LinkContainer>
  )
}
