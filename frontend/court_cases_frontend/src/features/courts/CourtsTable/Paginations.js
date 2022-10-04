import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';
import {pageChanged} from '../filterSlice'

export default function Paginations({courts_lenght}) {
    const current_page = useSelector(store=>store.filter.current_page)
    const items_per_page = useSelector(store=>store.filter.items_per_page)
    const max_pages = Math.ceil(courts_lenght / items_per_page)
    const dispatch = useDispatch()
    const updateCurrentPage = (number) => {
        dispatch(pageChanged(number))
    }
    let items = [];
    for (let number = 1; number <= max_pages; number++) {
    items.push(
        <Pagination.Item key={number} active={number === current_page} onClick={()=>updateCurrentPage(number)}>
        {number}
        </Pagination.Item>,
    );
    }

    useEffect(()=>{
        
    }, [items, current_page, dispatch])

  return (<>
    {max_pages == 1 ? <></> :
        <div style={{'paddingTop': '10px'}}>
        <Pagination>{items}</Pagination>
      </div>
    }
    </>
  )
}