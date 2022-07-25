import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

export default function CourtRow({court}) {
  return (
    <LinkContainer to={`/courts/${court.id}`} style={{'cursor': 'pointer'}}>
        <tr>
            <td>{court.number_of_court}</td>
            <td>{court.user_name}</td>
            <td>{court.case_source_and_summ}</td>
            <td>{court.case_purpose}</td>
            <td>{court.claim}</td>
            <td>{court.number_case_in_first_instance}</td>
            <td>{court.number_case_in_numenklature}</td>
        </tr>
    </LinkContainer>
  )
}
