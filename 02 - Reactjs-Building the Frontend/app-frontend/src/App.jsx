import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './users/pages/Users'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'


function App() {

  return (
    <BrowserRouter>
    <MainNavigation />
    <main>
      <Routes>
        <Route path='/'>
          <Route index={true} element={<Users />}/>
          <Route path=':userId/places' element={<UserPlaces />} />
          <Route path='places/new' element={<NewPlace />} />
          <Route path='places/:placeId' element={<UpdatePlace />} />
          </Route>
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App
