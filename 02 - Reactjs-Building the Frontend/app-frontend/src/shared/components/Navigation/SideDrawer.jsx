import React from 'react'
import './SideDrawer.css'

function SideDrawer(props) {
  return (
    <aside className='side-drawer'>
        {props.children}
    </aside>
  )
}

export default SideDrawer
