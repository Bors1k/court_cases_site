import React from 'react'

export default function DateFormat({str_date}) {

    if (str_date != undefined && str_date != null && str_date.includes('-')){
        const year = str_date.slice(0,4)
        const month = str_date.slice(5,7)
        const day = str_date.slice(8,10)
        return (
            <>{day}.{month}.{year}</>
          )
    }
    return ''
}
