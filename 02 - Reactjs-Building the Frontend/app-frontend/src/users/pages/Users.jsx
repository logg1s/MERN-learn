import { useEffect, useState } from 'react'
import UsersList from '../components/UsersList/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
function Users() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedUsers, setLoadedUsers] = useState()
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:8000/api/users')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setLoadedUsers(responseData)
      } catch (error) {
        console.error(error.message)
      }
      setIsLoading(false)
    }
    sendRequest()
  }, [])

  const errorHandler = () => {
    setError(null)
  }
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  )
}

export default Users
