import Input from '../../shared/components/FormElements/Input'
import { useCallback, useReducer } from 'react'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import Button from '../../shared/components/FormElements/Button';
import './NewPlace.css'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      }
    default:
      return state
  }
}

function NewPlace() {
  const [formState, dispatch] =  useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  })
  const inputHander = useCallback((id, value, isValid) => {
dispatch({
    type: 'INPUT_CHANGE',
    value: value,
    isValid: isValid,
    inputId: id})
  }, [])

  const placeSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs)
  }


  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHander} />
      <Input id="description" element="textarea" type="text" label="Description" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description (at lease 5 characters)" onInput={inputHander} />
      <Input id="adress" element="input" type="text" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid address" onInput={inputHander} />
      <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  )
}

export default NewPlace
