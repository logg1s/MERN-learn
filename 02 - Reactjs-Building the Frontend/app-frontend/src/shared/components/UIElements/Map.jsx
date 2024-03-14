import './Map.css'
import { Link } from 'react-router-dom'
function Map(props) {
  return (
    <>
      <h1>No API :VVV</h1>
      <Link
        to={`https://www.google.com/maps/place/${props.location.lat}, ${props.location.lng}`} target="_blank"
      >Redirect to Google Maps</Link>
    </>
  )
}

export default Map
