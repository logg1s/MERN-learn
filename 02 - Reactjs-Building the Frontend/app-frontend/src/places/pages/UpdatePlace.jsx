import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators'
import useForm from '../../shared/hooks/form-hook'
import './PlaceForm.css'
const PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the famous sky in the world',
    imageUrl: 'https://media.timeout.com/images/101705309/1024/576/image.webp',
    address: '20 W 34th St., New York, NY 10001, Hoa Kỳ',
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire',
    description: 'One of the famous sky in the world',
    imageUrl:
      'https://lh3.googleusercontent.com/p/AF1QipN8CEMCG4Qrk5HIkMWAAgGg4DZt2pL-E_324a1q=s1360-w1360-h1020',
    address: '20 W 34th St., New York, NY 10001, Hoa Kỳ',
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    },
    creator: 'u2'
  }
]

function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true)
  const placeId = useParams().placeId
  const identifiedPlace = PLACES.find((p) => p.id === placeId)

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: true
      },
      description: {
        value: '',
        isValid: true
      }
    },
    false
  )

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      )
    }
    setIsLoading(false)
  }, [setFormData, identifiedPlace])

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please aenter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />

      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please aenter a valid description (at least 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />

      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACES
      </Button>
    </form>
  )
}

export default UpdatePlace
