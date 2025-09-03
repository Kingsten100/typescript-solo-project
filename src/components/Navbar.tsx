import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className='navbar-container'>
        <div>
          <Link to={'/'} className='logo-link'>
            <h2>TrådHimlen</h2>
          </Link>
        </div>
      <div className='navbar-divider'/>
      </div>
    
    </>
  )
}

export default Navbar
