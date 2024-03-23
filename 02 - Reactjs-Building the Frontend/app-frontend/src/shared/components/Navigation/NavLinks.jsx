import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import { useContext } from 'react'
import './NavLinks.css'

function NavLinks(props) {
  const auth = useContext(AuthContext)

  const navLink = (to, title) => (
    <NavLink to={to} onClick={props.onClick}>
      {title}
    </NavLink>
  )
  return (
    <ul className="nav-links">
      <li>{navLink('/', 'ALL USERS')}</li>
      {auth.isLoggedIn && <li>{navLink(`/${auth.userId}/places`, 'MY PLACES')}</li>}

      {auth.isLoggedIn && <li>{navLink('/places/new', 'ADD PLACE')}</li>}
      {!auth.isLoggedIn && <li>{navLink('/auth', 'LOGIN / SIGN UP')}</li>}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  )
}

export default NavLinks
