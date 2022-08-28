import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user'
import { loggedOut } from '../../redux/auth'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'

export default function Setting() {
    const { url, path } = useRouteMatch()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(loggedOut())
    }

    return (
        <div className='container mb-5'>
            <div className='row'>
                <div className='col-md-4 border d-none d-md-block'>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <NavLink to={url} className='text-decoration-none'>
                                <span>Edit profile</span>
                            </NavLink>
                        </li>
                        <li className='list-group-item'>
                            <NavLink
                                to={`${url}/change_password`}
                                className='text-decoration-none'>
                                <span>Change password</span>
                            </NavLink>
                        </li>
                        <li className='list-group-item'>
                            <button
                                className='btn btn-sm btn-outline-danger'
                                type='button'
                                onClick={handleLogout}
                                >
                                Logout
                            </button>
                        </li>
                    </ul>
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
    )
}
