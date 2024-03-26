import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Users from './users/pages/Users'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './users/pages/Auth'
import { AuthContext } from './shared/context/auth-context'
import { useCallback, useState } from 'react'

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(false)
  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
    // localStorage.setItem(
    //   'userData',
    //   JSON.stringify({
    //     userId: uid,
    //     token
    //   })
    // )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
  }, [])

  let routes
  if (token) {
    routes = (
      <Route path="/">
        <Route index element={<Users />} />
        <Route path=":userId/places" element={<UserPlaces />} />
        <Route path="places/new" element={<NewPlace />} />
        <Route path="places/:placeId" element={<UpdatePlace />} />
      </Route>
    )
  } else {
    routes = (
      <Route path="/">
        <Route index element={<Users />} />
        <Route path=":userId/places" element={<UserPlaces />} />
        <Route path="auth" element={<Auth />} />
      </Route>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
            <Route path="*" element={<Navigate to={'/'} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
