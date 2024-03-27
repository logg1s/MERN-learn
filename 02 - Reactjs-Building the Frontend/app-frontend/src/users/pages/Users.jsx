import { useEffect, useState } from 'react'
import UsersList from '../components/UsersList/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
function Users() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_API_ENDPOINT}/users`
        )
        setLoadedUsers(responseData)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
