import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

// state management
import { loggedOut } from '../../redux/auth'

// hooks
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useUser } from '../../hooks/useUser'

export default function SettingLink() {
    const { logout } = useUser()
    const dispatch = useDispatch()

    const handleLogout = () => {
        logout()
        dispatch(loggedOut())
    }

    return (
        <ul className="list-group list-group-flush">
            <ListItem title="Edit Profile" />
            <ListItem title="Change Password" path="/change_password" />
            <ListItem title="Change Profile Picture" path="/change_profile_picture" />

            <ListItem title="About" />
            <ListItem title="Contact Us" />
            <ListItem listStyle={'text-danger fw-semibold'} title="Delete Account" />
            <li className="list-group-item">
                <button className="btn btn-sm btn-outline-danger mt-3" type="button" onClick={handleLogout}>
                    Logout
                </button>
            </li>
        </ul>
    )
}

function ListItem({ title, path, listStyle }) {
    const { width } = useWindowDimensions()
    const history = useHistory()

    return (
        <li
            className="list-group-item"
            data-bs-toggle={width < 768 && 'offcanvas'}
            data-bs-target={width < 768 && '#offcanvasRight'}
            aria-controls={width < 768 && 'offcanvasRight'}
            onClick={()=> history.push(`/setting${path ? path : ''}`)}
        >
                <span className={listStyle && listStyle}>{title}</span>
        </li>
    )
}
