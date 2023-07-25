import React, { useState, useEffect, useReducer, useContext } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })
  const ctx = useContext(AuthContext)

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const inputTimer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)

    return () => {
      clearTimeout(inputTimer)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    ctx.onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          value={emailState.value}
          isValid={emailIsValid}
          inputType='email'
          labelText='E-Mail'
          onChangeHandler={emailChangeHandler}
          onBlurHandler={validateEmailHandler}
        />
        <Input
          value={passwordState.value}
          isValid={passwordIsValid}
          inputType='password'
          labelText='Password'
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
