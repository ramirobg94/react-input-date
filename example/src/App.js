import React, {useState} from 'react'

import DateInput from 'react-date-input'
//import 'react-date-input/dist/index.css'

export const ExampleComponent = ({ initialDate, format, separator}) => {
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


const App = () => {
  return <div className="app-container">
  <ExampleComponent initialDate="12/02/2020" format='DDMMYYYY'/>
  <ExampleComponent initialDate="12*02*2020" format='DDMMYYYY' separator="*" />
  <ExampleComponent initialDate="02-12-2020" format='MMDDYYYY' separator="-" />
  <ExampleComponent initialDate="2020/02/25" format="YYYYMMDD"/>
  <ExampleComponent initialDate="2020/02/31" format="YYYYMMDD"/>
  <ExampleComponent  format="YYYYMMDD"/>
</div>
}

export default App


