import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='side-divider'>
      <div className='sidebar-content'>
        <div className='sidebar-section'>
          <h3 className='sidebar-title'>Forum</h3>
          <ul className='sidebar-nav'>
            <li><Link to="/" className='sidebar-link'>Senaste</Link></li>
            <li><Link to="/" className='sidebar-link'>Populärt</Link></li>
          </ul>
        </div>
        
        <div className='sidebar-section'>
          <h3 className='sidebar-title'>Kategorier</h3>
          <ul className='sidebar-categories'>
            <li><span className='category-item'>Moln</span></li>
            <li><span className='category-item'>Unicorns</span></li>
            <li><span className='category-item'>Spel</span></li>
            <li><span className='category-item'>Ost</span></li>
            <li><span className='category-item'>Katter</span></li>
            <li><span className='category-item'>Hattar</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
