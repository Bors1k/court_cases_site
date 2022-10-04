import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import {filtersChanged, pageChanged} from '../filterSlice'
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

export default function CourtTableFilters({filters}) {

  const dispatch = useDispatch()
  const [filter, setFilter] = useState(filters == null ? '' : filters)
  const onSearch = (e)=>{
    e.preventDefault()
    dispatch(filtersChanged(filter))
    dispatch(pageChanged(1))
  }
  return (
    <Form onSubmit={onSearch}>
      <Row>
        <Col>
          <Form.Control
            type="text"
            id="inputSearch"
            placeholder='Поиск...'
            style={{'marginBottom': '10px'}}
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button type="submit">Поиск</Button>
        </Col>
      </Row>
    </Form>
  )
}
