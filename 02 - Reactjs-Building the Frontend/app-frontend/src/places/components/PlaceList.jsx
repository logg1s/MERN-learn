import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import PlaceItem from './PlaceItem'
import './PlaceList.css'
import { useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context'

function PlaceList(props) {
  const auth = useContext(AuthContext)
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No place found</h2>
          {auth.userId === props.userId && (
            <Button to="/places/new">ADD PLACE</Button>
          )}
        </Card>
      </div>
    )
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place._id}
          id={place._id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator._id}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  )
}

export default PlaceList
