import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user'
import { loggedOut } from '../../redux/auth'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import Nav from '../../components/Navbar/Nav'
import Navbar from '../../components/Navbar/Navbar'

export default function Setting() {
    const { path } = useRouteMatch()
    const currentUser = useSelector((state) => state.user.value)
    const { width } = useWindowDimensions()

    return (
        <>
            {width < 768 ? <Nav title='Setting' /> : <Navbar />}
            <div className='container mb-5'>
                <div className='row mt-md-3'>
                    <div className='col-md-4 border d-none d-md-block'>
                        <SettingLink />
                    </div>
                    <div className='col-md-8 border p-md-3'>
                        <Switch>
                            <Route exact path={path}>
                                <EditProfile currentUser={currentUser} />
                            </Route>
                            <Route path={`${path}/change_password`}>
                                <ChangePassword currentUser={currentUser} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}

function ListItem({ title, path, listStyle }) {
    const { width } = useWindowDimensions()

    return (
        <li
            className='list-group-item bg-light'
            data-bs-toggle={width < 768 && 'offcanvas'}
            data-bs-target={width < 768 && '#offcanvasRight'}
            aria-controls={width < 768 && 'offcanvasRight'}>
            <NavLink
                to={`/setting${path ? path : ''}`}
                className='text-decoration-none text-secondary'>
                <span className={listStyle && listStyle}>{title}</span>
            </NavLink>
        </li>
    )
}

export function SettingLink() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(loggedOut())
    }

    return (
        <ul className='list-group list-group-flush'>
            <ListItem title='Edit Profile' />
            <ListItem title='Change Password' path='/change_password' />

            <ListItem title='About' />
            <ListItem title='Contact Us' />
            <ListItem
                listStyle={'text-danger fw-semibold'}
                title='Delete Account'
                path='/change_password'
            />
            <li className='list-group-item bg-light'>
                <button
                    className='btn btn-sm btn-outline-danger mt-3'
                    type='button'
                    onClick={handleLogout}>
                    Logout
                </button>
            </li>
        </ul>
    )
}
