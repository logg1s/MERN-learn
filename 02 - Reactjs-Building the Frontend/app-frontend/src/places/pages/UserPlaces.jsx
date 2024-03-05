import PlaceList from '../components/PlaceList'
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
        title: 'Empire State Building',
        description: 'One of the famous sky in the world',
        imageUrl: 'https://media.timeout.com/images/101705309/1024/576/image.webp',
        address: '20 W 34th St., New York, NY 10001, Hoa Kỳ',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u2'
    }
]
function UserPlaces() {
  return (
    <PlaceList items={PLACES}/>
  )
}

export default UserPlaces
