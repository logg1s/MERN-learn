import UsersList from '../components/UsersList/UsersList'
function Users() {
  const USERS = [
    {
    id: '1',
    name: 'long',
    image: 'https://lh3.googleusercontent.com/ogw/AF2bZyjF4idx4jq1VaVIYfaCBTwony-a0Vql5rBQoN4uUg=s32-c-mo',
    places: 3
  }
]
  return (
    <UsersList
      items={USERS}
    />
  )
}

export default Users
