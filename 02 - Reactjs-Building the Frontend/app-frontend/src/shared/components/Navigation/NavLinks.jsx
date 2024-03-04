import { NavLink } from 'react-router-dom'
import './NavLinks.css'


function NavLinks(props) {
const navLink = (to, title) => <NavLink to={to} onClick={props.onClick}>{title}</NavLink>
  return (
    <ul className='nav-links'>
        <li>
            {navLink('/', 'ALL USERS')}
        </li>
        <li>
            {navLink('/u1/places', 'MY PLACES')}
        </li>

        <li>
            {navLink('/places/new', 'ADD PLACES')}
        </li>
        <li>
            {navLink('/auth', 'AUTHENTICATE')}
        </li>
    </ul>
  )
}

export default NavLinks
