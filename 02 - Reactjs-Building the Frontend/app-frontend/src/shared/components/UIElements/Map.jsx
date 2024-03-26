import './Map.css'
function Map(props) {
  return (
    <iframe
      className="map"
      src={`https://maps.google.com/maps?width=100%&height=100%&hl=en&q=${props.location.lat}, ${props.location.lng} (Map)&t=&z=17&ie=UTF8&iwloc=B&output=embed`}
    >
    </iframe>
  )
}

export default Map
