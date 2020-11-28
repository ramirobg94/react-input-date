import React, { useState } from 'react'
import styles from './styles.module.css'

import DateInput from './DateInput'

export const Component = ({ initialDate, format, separator}) => {
  const [date, setDate] = useState(initialDate)

  const handleChange = (value) => {
    setDate(value)
  }
  return (
    <DateInput
      disabled={false}
      format={format}
      separator={separator}
      date={date}
      onChange={handleChange}
    />
  )
}
export const ExampleComponent = ({ text }) => {
  return (
    <div className={styles.test}>
      <Component initialDate="12/02/2020" format='DDMMYYYY'/>
      <Component initialDate="12*02*2020" format='DDMMYYYY' separator="*" />
      <Component initialDate="02-12-2020" format='MMDDYYYY' separator="-" />
      <Component initialDate="2020/02/25" format="YYYYMMDD"/>
      <Component initialDate="2020/02/31" format="YYYYMMDD"/>
      <Component  format="YYYYMMDD"/>
    </div>
  )
}
