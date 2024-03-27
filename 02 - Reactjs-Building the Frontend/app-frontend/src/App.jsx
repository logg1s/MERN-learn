import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './users/pages/Users'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './users/pages/Auth'
import { AuthContext } from './shared/context/auth-context'
import { useCallback, useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  let routes
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/">
          <Route index element={<Users />} />
          <Route path=":userId/places" element={<UserPlaces />} />
          <Route path="places/new" element={<NewPlace />} />
          <Route path="places/:placeId" element={<UpdatePlace />} />
        </Route>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/">
          <Route index element={<Users />} />
          <Route path=":userId/places" element={<UserPlaces />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    )
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
