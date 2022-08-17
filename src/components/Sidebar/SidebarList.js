/** React dependencies */
import { Fragment } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function SidebarList() {
    const currentUser = useSelector((state) => state.user.value)
    const { path } = useRouteMatch()

    const activeList = (link) => {
        return link === path ? 'nav-link active' : 'nav-link'
    }
    return (
        <Fragment>
            <li className='nav-item d-sm-none d-block'>
                <Link to='/login' className={activeList()}>
                    <i className='nav-icon far fa-circle' />
                    <p>Login / Signup</p>
                </Link>
            </li>

            <li className='nav-item d-none d-sm-block'>
                <Link to='/' className={activeList('/')}>
                    <i className='nav-icon fas fa-home' />
                    <p>Home</p>
                </Link>
            </li>
            {/* Development Page Only */}
            <li className='nav-item'>
                <Link to='/user-list' className='nav-link'>
                    <i className='nav-icon fas fa-user' />
                    <p>DEV - User List</p>
                </Link>
            </li>
        </Fragment>
    )
}
