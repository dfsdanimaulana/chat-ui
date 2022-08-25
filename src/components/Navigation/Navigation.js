import { NavLink } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

export default function Navigation () {
  return (
      <div className="navbar navbar-expand d-md-none navbar-dark bg-info text-dark fixed-bottom justify-content-around border-top" 
      style={{
        height: '56px'
      }}
      >
          <NavLink className='nav-link fs-5' exact to='/'>
              <i className='bi bi-house-door'></i>
          </NavLink>
          <NavLink className='nav-link fs-5' to='/post/create'>
              <i className='bi bi-search'></i>
          </NavLink>
          <NavLink className='nav-link fs-5' to='#'>
              <i className='bi bi-file-play'></i>
          </NavLink>
          <NavLink className='nav-link fs-5' to='#'>
              <i className='bi bi-bag'></i>
          </NavLink>
          <NavLink className='nav-link fs-5' to='/profile'>
              <Avatar width={23} thumbnail='false' />
          </NavLink>
      </div>
    )
}