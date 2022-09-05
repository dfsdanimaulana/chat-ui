import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user'
import { loggedOut } from '../../redux/auth'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { NavLink } from 'react-router-dom'

export default function SettingLink() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(loggedOut())
    }

    return (
        <ul className='list-group list-group-flush'>
            <ListItem title='Edit Profile' />
            <ListItem title='Change Password' path='/change_password' />
            <ListItem
                title='Change Profile Picture'
                path='/change_profile_picture'
            />

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
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </li>
        </ul>
    )
}

function ListItem({ title, path, listStyle }) {
    const { width } = useWindowDimensions()

    return (
        <li
            className='list-group-item bg-light'
            data-bs-toggle={width < 768 && 'offcanvas'}
            data-bs-target={width < 768 && '#offcanvasRight'}
            aria-controls={width < 768 && 'offcanvasRight'}
        >
            <NavLink
                to={`/setting${path ? path : ''}`}
                className='text-decoration-none text-secondary'
            >
                <span className={listStyle && listStyle}>{title}</span>
            </NavLink>
        </li>
    )
}
