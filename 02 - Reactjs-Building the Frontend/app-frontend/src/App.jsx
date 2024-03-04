import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './users/pages/Users'
import Places from './places/pages/Places'
import MainNavigation from './shared/components/Navigation/MainNavigation'

function App() {


  return (
    <BrowserRouter>
    <MainNavigation />
    <main>
      <Routes>
        <Route path='/'>
          <Route index={true} element={<Users />}/>
          <Route path='places' element={<Places />} />
          </Route>
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App
