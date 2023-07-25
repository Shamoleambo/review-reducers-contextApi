import classes from './Input.module.css'

const Input = ({
  value,
  isValid,
  inputType,
  labelText,
  onChangeHandler,
  onBlurHandler
}) => {
  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={inputType}>{labelText}</label>
      <input
        type={inputType}
        id={inputType}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  )
}

export default Input
