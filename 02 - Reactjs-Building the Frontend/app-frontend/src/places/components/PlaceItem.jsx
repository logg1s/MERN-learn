import Card from '../../shared/components/UIElements/Card'

import './PlaceItem.css'

function PlaceItem(props) {
  return (
    <Card className="place-item__content">
      <li className="place-item">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>

        <div className="place-item__actions">
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </li>
    </Card>
  )
}

export default PlaceItem
