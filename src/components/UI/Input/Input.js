import React, { useRef, useImperativeHandle } from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef(
  (
    { value, isValid, inputType, labelText, onChangeHandler, onBlurHandler },
    ref
  ) => {
    const inputRef = useRef()

    const activate = () => {
      inputRef.current.focus()
    }

    useImperativeHandle(ref, () => ({ activate }))

    return (
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={inputType}>{labelText}</label>
        <input
          ref={inputRef}
          type={inputType}
          id={inputType}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
      </div>
    )
  }
)

export default Input
