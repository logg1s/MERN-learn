import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { useState, useContext } from 'react'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators'
import useForm from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import './Auth.css'
function Auth() {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const navigate = useNavigate()

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  })
  const authSubmitHandler = async (event) => {
    event.preventDefault()
    if (isLoginMode) {
      const responseData = await sendRequest(
        'http://localhost:8000/api/users/login',
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        }
      )
      if (responseData) {
        auth.login(responseData.user._id)
        navigate('/')
      }
    } else {
      let formData = new FormData()
      formData.append('name', formState.inputs.name.value)
      formData.append('email', formState.inputs.email.value)
      formData.append('password', formState.inputs.password.value)
      formData.append('image', formState.inputs.image.value)
      const responseData = await sendRequest(
        'http://localhost:8000/api/users/signup',
        'POST',
        formData
      )
      if (responseData) {
        auth.login(responseData.user._id)
        navigate('/')
      }
    }
  }

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isvalid: false
          }
        },
        false
      )
    }
    setIsLoginMode((prevMode) => !prevMode)
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload center id="image" onInput={inputHandler} />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address !"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password (at least 5 chracters) !"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </>
  )
}

export default Auth
