import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Users from './users/pages/Users'
import Places from './places/pages/Places'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index={true} element={<Users />}/>
          <Route path='places' element={<Places />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
