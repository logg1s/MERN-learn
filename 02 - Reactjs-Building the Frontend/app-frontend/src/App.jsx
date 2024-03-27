import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { AuthContext } from './shared/context/auth-context'
import useAuth from './shared/hooks/auth-hook'
import { lazy, Suspense } from 'react'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'
const Users = lazy(() => import('./users/pages/Users'))
const UserPlaces = lazy(() => import('./places/pages/UserPlaces'))
const NewPlace = lazy(() => import('./places/pages/NewPlace'))
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace'))
const Auth = lazy(() => import('./users/pages/Auth'))

function App() {
  const { token, login, logout, userId } = useAuth()

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
      <HashRouter>
        <MainNavigation />
        <main>
          <Suspense fallback={
            <div className='center'><LoadingSpinner /></div>
          }>
            <Routes>
              {routes}
              <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
          </Suspense>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  )
}

export default App
