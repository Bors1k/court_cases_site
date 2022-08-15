import React from 'react'

export default function NotifiesRow({notify}) {

    const chief_message_date = new Date(notify.date_of_notify)
    chief_message_date.setDate(chief_message_date.getDate() + (notify.max_count_before_chief_notify * notify.count_update_day - notify.notify_count * notify.count_update_day))
    console.log(chief_message_date)

  return (
        <tr>
            <td>{notify.notify_message}</td>
            <td>{notify.date_of_notify}</td>
            {/* <td>{notify.notify_count}</td> */}
            <td>{`${chief_message_date.getFullYear()}-`+
            `${chief_message_date.getMonth() < 9 ? `0${chief_message_date.getMonth()+1}`: chief_message_date.getMonth()+1}-`+
            `${chief_message_date.getDate() < 10 ? `0${chief_message_date.getDate()}`: chief_message_date.getDate()}`}</td>
        </tr>
  )
}
