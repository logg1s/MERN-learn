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
      {auth.isLoggedIn && <li>{navLink('/u1/places', 'MY PLACES')}</li>}

      {auth.isLoggedIn && <li>{navLink('/places/new', 'ADD PLACES')}</li>}
      {!auth.isLoggedIn && <li>{navLink('/auth', 'AUTHENTICATE')}</li>}
    </ul>
  )
}

export default NavLinks
