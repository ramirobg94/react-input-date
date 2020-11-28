import React, { Fragment, useState } from 'react'
import { validatorsByKey } from '../utils'
import { useInput } from '../hooks'

const Input = React.forwardRef(
  (
    {
      disabled = false,
      placeholders,
      labels,

      date,
      format,
      separator,

      itemIndex,
      dateKey,

      onChange,
      moveBack,
      moveNext,

      shouldManageZero = true
    },
    ref
  ) => {
    const { value, error, label, placeholder, handleChange } = useInput({
      labels,
      placeholders,
      ref,
      date,
      onChange,
      format,
      separator,
      itemIndex,
      isfocused: ref && ref.current !== document.activeElement,
      dateKey
    })

    const [nextBack, setNextBack] = useState(false)
    const [nextBackArrow, setNextBackArrow] = useState(false)
    const [nextForwardArrow, setNextForwardArrow] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const [zeroTyped, setZeroTyped] = useState(false)
    const numericValue = parseInt(value, 10)

    const handleFocus = (e) => {
      setZeroTyped(false)
      setIsFocused(true)

      ref.current.select(0, ref.current.value.length)
    }

    const handleBlur = () => {
      setZeroTyped(false)
      setIsFocused(false)
    }
    const handleKeyDown = (e) => {
      // 48 is 0
      if (
        shouldManageZero &&
        e.keyCode === 48 &&
        (e.target.value === '' ||
          (ref.current.selectionStart === 0 &&
            ref.current.selectionEnd === e.target.value.length))
      ) {
        setZeroTyped(true)
      }

      if (zeroTyped) {
        if ([49, 50, 51, 52, 53, 54, 55, 56, 57].includes(e.keyCode)) {
          const nextValue = `${e.target.value}${String.fromCharCode(e.keyCode)}`
          if (nextValue !== '' && nextValue.length <= 2) {
            moveNext({ itemIndex, [dateKey]: nextValue })
            e.stopPropagation()
            e.preventDefault()
          }
        } else {
          if (e.keyCode !== 48) {
            setZeroTyped(false)
          }
        }
      }
    }

    const handleKeyUp = (e) => {
      if (e.keyCode !== 8) {
        setNextBack(false)
      }
      if (e.keyCode === 8 && e.target.value === '') {
        if (nextBack) {
          setNextBack(false)
          moveBack({ itemIndex })
        } else {
          setNextBack(true)
        }
      }

      if (e.keyCode !== 37) {
        setNextBackArrow(false)
      }

      if (
        e.keyCode === 37 &&
        ref.current.selectionStart === ref.current.selectionEnd &&
        ref.current.selectionStart === 0
      ) {
        if (nextBackArrow) {
          setNextBackArrow(false)
          moveBack({ itemIndex })
        } else {
          setNextBackArrow(true)
        }
      }

      if (e.keyCode !== 38) {
        setNextForwardArrow(false)
      }

      if (
        e.keyCode === 39 &&
        ref.current.selectionStart === ref.current.selectionEnd &&
        ref.current.selectionStart === ref.current.value.length
      ) {
        if (nextForwardArrow) {
          setNextForwardArrow(false)
          moveNext({ itemIndex, [dateKey]: ref.current.value })
        } else {
          setNextForwardArrow(true)
        }
      }
    }

    return (
      <div className='input-container'>
        <div className='label-container'>
          <label className='label'>{label}</label>
        </div>
        <input
          ref={ref}
          className={` date-input input-${dateKey}`}
          disabled={disabled}
          placeholder={placeholder}
          type={error ? 'text' : 'text'}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          value={getValueToShow({
            zeroTyped: shouldManageZero ? zeroTyped : !shouldManageZero,
            numericValue,
            value,
            ref,
            shouldManageZero,
            isFocused
          })}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          pattern='\d*'
        />
      </div>
    )
  }
)

export default Input

const getValueToShow = ({ numericValue, value, isFocused, zeroTyped }) => {
  if (isFocused && zeroTyped && numericValue === 0) return '0'
  if (zeroTyped && /^0/.test(value) && !/^00/.test(value)) return value

  if (value !== '' && !isNaN(numericValue) && numericValue > 0) {
    return String(
      isFocused && (/^00/.test(value) || numericValue > 100)
        ? numericValue
        : value
    )
  }

  return ''
}
