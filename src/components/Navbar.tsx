import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { logout, currentUser } = useAuth()

  const closeMenu = () => setOpen(false)
  return (
    <>
      <div className='navbar-container'>

        <div>
          <Link to={'/'} className='logo-link'>
            <h2>TrådHimlen</h2>
          </Link>
        </div>
        <div className='navbar-btns'>
          <NavLink to='/create' className={({ isActive }) => (isActive ? 'navbar-btn active' : 'navbar-btn')}>Skapa ny tråd</NavLink>
          <button onClick={() => setOpen(!open)} className='navbar-user'>
            <img src="../../public/UserIcon.svg" alt="" />
          </button>
          {
            open && (
              <>
                <div onClick={closeMenu} className='dropdown-overlay'>
                  
                </div>

                <div className='dropdown-menu'>
                  <h4 className='min-sida'>Min sida</h4>
                  
                  <ul>
                    <li >
                      <Link onClick={closeMenu} className='dropdown-link-text' to='/myThreads'>Mina trådar</Link>
                    </li>
                  </ul>
                </div>
              
              </>
            )
          }
          { currentUser ?
            <button onClick={() => {logout()}} className='navbar-btn '>Logga ut</button>
            :
            <Link to='/login'className='navbar-btn login-btn'>Logga in</Link>
          }
        </div>
      </div>
      <div className='navbar-divider'/>
    
    </>
  )
}

export default Navbar
