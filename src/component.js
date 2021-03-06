import React, { useState, useEffect, createRef, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

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

const getDateValue = ({ date, format, separator }) => {
  const { day, month, year } = extractInfoFromDate({ date, format, separator })
  return new Date(year, month - 1, day)
}

const DateInput = React.forwardRef(
  (
    {
      className,
      format = 'MMDDYYYY',
      separator = '/',
      placeholders = PLACEHOLDERS,
      labels = LABELS,
      showLabel = false,

      disabled,
      date,
      onChange,
      onFocus,
      onBlur,
      withCalendar = true,
      ...props
    },
    ref
  ) => {
    const dateInputContainer = useRef()
    const calendarContainer = useRef()
    const [dateInputContainerRef, setDateInputContainerRef] = useState(null)
    const [localDate, setDate] = useState('')
    const [elRefs, setElRefs] = React.useState([])
    const [error, setError] = useState(false)
    const [warning, setWarning] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)

    const dateKeys = dateKeysByFormat[format]

    const handleFocus = () => {
      onFocus && onFocus()
      setIsCalendarOpen(true)
    }

    const handleBlur = (e) => {
      onBlur && onBlur()
    }

    useEffect(() => {
      if (date) {
        setDate(date)
        handleValidateDate({ date })
      }
    }, [date])

    React.useEffect(() => {
      // add or remove refs
      setElRefs((elRefs) =>
        Array(3)
          .fill()
          .map((_, i) => elRefs[i] || createRef())
      )
      setDateInputContainerRef(dateInputContainer)
    }, [])

    const globalClickListener = (e) => {
      if (
        !(
          e.path.includes(calendarContainer.current) ||
          e.path.includes(dateInputContainer.current)
        ) &&
        isCalendarOpen
      ) {
        setIsCalendarOpen(false)
      }
    }

    useEffect(() => {
      window.addEventListener('click', globalClickListener)
      return () => {
        document.removeEventListener('click', globalClickListener)
      }
    }, [isCalendarOpen])

    const handleShouldFocusCalendar = (e) => {
      if (!withCalendar) return
      if (e.target === elRefs[2].current && e.key === 'Tab') {
        e.stopPropagation()
        e.preventDefault()
        calendarContainer.current.getElementsByTagName('button')[0].focus()
      }

      if (isCalendarOpen && e.key === 'Enter') {
        e.stopPropagation()
        e.preventDefault()
        if([...calendarContainer.current.getElementsByTagName('button')].includes(document.activeElement)){
          document.activeElement.click()
        }
      }

      if (isCalendarOpen && e.key === 'Escape') {
        e.stopPropagation()
        e.preventDefault()
        setIsCalendarOpen(false)
      }
    }

    useEffect(() => {
      window.addEventListener('keydown', handleShouldFocusCalendar)

      return () => {
        window.removeEventListener('keydown', handleShouldFocusCalendar)
      }
    }, [elRefs, calendarContainer, isCalendarOpen, document.activeElement])

    const handleValidateDate = ({ date }) => {
      setError(false)
      setWarning(false)
      const { isValid, isIncomplete } = validateDate({
        date,
        format,
        separator
      })
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
        shouldJumpNext({
          day,
          month,
          year,
          separator,
          format,
          date,
          canMoveNext
        })
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

    const calculatedPosition = useMemo(() => {
      //State.calculatePosition(state)
      const el = dateInputContainerRef && dateInputContainerRef.current
      if (el) {
        const rect = el.getBoundingClientRect()

        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop

        return {

          top: rect.top + scrollTop + rect.height,
          left: rect.left + scrollLeft,
          position: 'absolute'
        }
      }

      return {}
    }, [dateInputContainerRef])

    const handleChangeDateCalendar = (newDate) => {
      const year = String(newDate.getFullYear())
      const month = String(newDate.getMonth() + 1)
      const day = String(newDate.getDate())
      handleChange({ canMoveNext: false, day, month, year })
    }

    const renderCalendar = () => {
      return ReactDOM.createPortal(
        <div
          ref={calendarContainer}
          onClick={(e) => e.stopPropagation()}
          className='calendar-container'
          style={{ ...calculatedPosition }}
        >
          <Calendar
            inputRef={ref}
            disabled={disabled}
            onChange={handleChangeDateCalendar}
            value={getDateValue({ date: localDate, format, separator })}
          />
        </div>,
        document.body
      )
    }

    return (
      <div ref={ref} className={`${className} date-input`}>
        <div ref={dateInputContainer} className='date-input-container'>
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
            dateKey: dateKeys[0],
            onFocus: handleFocus,
            onBlur: handleBlur,
            showLabel
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
            dateKey: dateKeys[1],
            onFocus: handleFocus,
            onBlur: handleBlur,
            showLabel
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
            dateKey: dateKeys[2],
            onFocus: handleFocus,
            onBlur: handleBlur,
            showLabel
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

        {withCalendar && isCalendarOpen && renderCalendar()}
      </div>
    )
  }
)

export default DateInput
