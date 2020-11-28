import React, { useState, useEffect, Fragment, createRef } from 'react'

import {
  extractInfoFromDate,
  buildDate,
  getDaysInMonth,
  validateDate
} from './utils'

import Separator from './Separator'
import Input from './Input'

const dateKeysByFormat = {
  MMDDYYYY: ['month', 'day', 'year'],
  DDMMYYYY: ['day', 'month', 'year'],
  YYYYMMDD: ['year', 'month', 'day']
}

const shouldJumpNext = ({
  day,
  month,
  year,
  date,
  separator,
  format,
  canMoveNext
}) => {
  if (parseInt(day, 10) >= 4) return true
  if (((day || '').startsWith('0') || canMoveNext) && parseInt(day, 10) > 0)
    return true
  const maxDaysInMonth = getDaysInMonth({ date, separator, format })
  if (maxDaysInMonth < 30 && parseInt(day, 10) >= 3) return true

  if (parseInt(month, 10) >= 2) return true
  if (((month || '').startsWith('0') || canMoveNext) && parseInt(month, 10) > 0)
    return true

  if (parseInt(year, 10) >= 1000) return true
  if (
    false &&
    ((year || '').startsWith('0') || canMoveNext) &&
    parseInt(year, 10) > 0
  )
    return true

  return false
}

const PLACEHOLDERS = {
  day: 'dd',
  month: 'mm',
  year: 'yyyy'
}

const LABELS = {
  day: 'Day',
  month: 'Month',
  year: 'Year'
}

const DateInput = ({
  className,
  format = 'MMDDYYYY',
  separator = '/',
  placeholders = PLACEHOLDERS,
  labels = LABELS,

  disabled,
  date,
  onChange,
  ...props
}) => {
  const [localDate, setDate] = useState('')
  const [elRefs, setElRefs] = React.useState([])
  const [error, setError] = useState(false)
  const [warning, setWarning] = useState(false)

  const dateKeys = dateKeysByFormat[format]

  useEffect(() => {
    if (date) {
      setDate(date)
      handleValidateDate({ date })
    }
  }, [])

  React.useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(3)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    )
  }, [])

  const handleValidateDate = ({ date }) => {
    setError(false)
    setWarning(false)
    const { isValid, isIncomplete } = validateDate({ date, format, separator })
    if (!isValid) {
      setError(true)
    }
    if (isIncomplete) {
      setWarning(true)
    }
  }
  const handleChange = ({
    day,
    month,
    year,
    itemIndex,
    canMoveNext = false
  }) => {
    const newDate = buildDate({
      date: localDate,
      separator,
      format,
      day,
      month,
      year
    })

    if (
      shouldJumpNext({ day, month, year, separator, format, date, canMoveNext })
    ) {
      if (elRefs[itemIndex + 1]) {
        elRefs[itemIndex + 1].current.focus()
        elRefs[itemIndex + 1].current.setSelectionRange(
          0,
          elRefs[itemIndex + 1].current.value.length
        )
      }
    }
    setDate(newDate)
    onChange(newDate)
    handleValidateDate({ date: newDate })
  }

  const moveBack = ({ itemIndex }) => {
    if (elRefs[itemIndex - 1]) {
      elRefs[itemIndex - 1].current.focus()
      elRefs[itemIndex - 1].current.setSelectionRange(
        0,
        elRefs[itemIndex - 1].current.value.length
      )
    }
  }

  const moveNext = ({ itemIndex, day, month, year }) => {
    handleChange({ itemIndex, canMoveNext: true, day, month, year })
  }

  return (
    <div className={className}>
      <div className='date-input-container'>
        {React.createElement(Input, {
          disabled,
          date: localDate,
          placeholders,
          labels: LABELS,
          separator,
          format,
          onChange: handleChange,
          itemIndex: 0,
          ref: elRefs[0],
          moveBack,
          moveNext,
          dateKey: dateKeys[0]
        })}
        <Separator separator={separator} />
        {React.createElement(Input, {
          disabled,
          placeholders,
          labels: LABELS,
          date: localDate,
          separator,
          format,
          onChange: handleChange,
          itemIndex: 1,
          ref: elRefs[1],
          moveBack,
          moveNext,
          dateKey: dateKeys[1]
        })}
        <Separator separator={separator} />
        {React.createElement(Input, {
          disabled,
          placeholders,
          labels: LABELS,
          date: localDate,
          separator,
          format,
          onChange: handleChange,
          itemIndex: 2,
          ref: elRefs[2],
          moveBack,
          moveNext,
          dateKey: dateKeys[2]
        })}
      </div>
      {error && (
        <div className='error-container'>
          <small>Invalid date</small>
        </div>
      )}
      {warning && (
        <div className='error-container'>
          <small>Incomplete date</small>
        </div>
      )}
    </div>
  )
}

export default DateInput
