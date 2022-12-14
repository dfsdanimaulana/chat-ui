import { useHistory } from 'react-router-dom'

// hooks
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAuth } from '../../hooks/useAuth'
import { usePost } from '../../hooks/usePost'

export default function SettingLink() {
    const { logout } = useAuth()
    const { reset } = usePost()

    const handleLogout = () => {
        logout()
        reset()
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
                <button
                    className="btn btn-sm btn-outline-danger mt-3"
                    data-bs-dismiss="offcanvas"
                    type="button"
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
    const history = useHistory()

    return (
        <li
            className="list-group-item cursor-pointer"
            data-bs-toggle={width < 768 && 'offcanvas'}
            data-bs-target={width < 768 && '#offcanvasRight'}
            aria-controls={width < 768 && 'offcanvasRight'}
            onClick={() => history.push(`/setting${path ? path : ''}`)}
        >
            <span className={listStyle && listStyle}>{title}</span>
        </li>
    )
}
