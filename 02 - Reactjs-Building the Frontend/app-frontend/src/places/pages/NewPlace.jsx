import Input from '../../shared/components/FormElements/Input'
import useForm from '../../shared/hooks/form-hook'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import Button from '../../shared/components/FormElements/Button'
import './PlaceForm.css'


function NewPlace() {
 const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    adress: {
      value: '',
      isValid: false
    }
  }, false)


  const placeSubmitHandler = event => {
    event.preventDefault()
  }


  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHandler} />
      <Input id="description" element="textarea" type="text" label="Description" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description (at lease 5 characters)" onInput={inputHandler} />
      <Input id="adress" element="input" type="text" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid address" onInput={inputHandler} />
      <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  )
}

export default NewPlace
