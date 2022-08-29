import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user'
import { loggedOut } from '../../redux/auth'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import Nav from '../../components/Navbar/Nav'

function ListItem ({ title, path }) {
  const { width } = useWindowDimensions()
  
  return (
          <li 
              className='list-group-item'
              data-bs-toggle={ width < 768 && 'offcanvas' }
              data-bs-target={width < 768 && '#offcanvasRight'}
              aria-controls={ width < 768 && 'offcanvasRight'}
              >
              <NavLink
              to={`/setting${path ? path : ''}`}
              className='text-decoration-none text-secondary'>
                  <span>{title}</span>
              </NavLink>
          </li>
    )
}

export function SettingLink () {
  const dispatch = useDispatch()
  
  const handleLogout = () => {
      dispatch(logout())
      dispatch(loggedOut())
  }
  
  return (
     <ul className='list-group list-group-flush'>
          <ListItem title='Edit profile' />
          <ListItem title='Change password' path='/change_password'/>
          <li className='list-group-item'>
              <button
                  className='btn btn-sm btn-outline-danger mt-3'
                  type='button'
                  onClick={handleLogout}
                  >
                  Logout
              </button>
          </li>
      </ul>
    )
}

export default function Setting() {
    const { path } = useRouteMatch()
    
    
    return (
      <>
      <Nav title='Settings' />
        <div className='container mb-5'>
            <div className='row mt-md-3'>
                <div className='col-md-4 border d-none d-md-block'>
                   <SettingLink />
                </div>
                <div className='col-md-8 border p-md-3'>
                    <Switch>
                        <Route exact path={path}>
                            <EditProfile />
                        </Route>
                        <Route path={`${path}/change_password`}>
                            <ChangePassword />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
        </>
    )
}
