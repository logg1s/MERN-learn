import UsersList from '../components/UsersList/UsersList'
function Users() {
  const USERS = [
    {
    id: '1',
    name: 'long',
    image: 'https://images.unsplash.com/photo-1709002461508-408bdea0b5e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwOTQ2NTQ4MA&ixlib=rb-4.0.3&q=80&w=1080',
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
