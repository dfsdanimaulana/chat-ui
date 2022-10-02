import { Link, NavLink, useRouteMatch, useParams, useHistory } from 'react-router-dom'
import SettingPopUp from '../../pages/Setting/SettingPopUp'
import Avatar from '../Avatar/Avatar'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
    const history = useHistory()
    const { path } = useRouteMatch()
    const { user } = useAuth()
    const { width } = useWindowDimensions()
    const { username } = useParams()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top bg-white">
                <div className="container d-flex">
                    {path === '/profile' && width < 768 ? (
                        <span className="navbar-brand flex-fill fw-bold align-items-center" onClick={() => history.goBack()}>
                            <i className="bi bi-arrow-left me-3"></i>
                            {user.username}
                        </span>
                    ) : username && width < 768 ? (
                        <span className="navbar-brand flex-fill fw-bold align-items-center" onClick={() => history.goBack()}>
                            <i className="bi bi-arrow-left me-3"></i>
                            {username}
                        </span>
                    ) : (
                        <Link className="navbar-brand flex-fill fw-bold align-items-center" to="/">
                            DanApp{' '}
                        </Link>
                    )}

                    <form className="d-sm-flex flex-fill d-none" role="search">
                        <input
                            className="form-control form-control-sm me-2 bg-light"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-sm btn-outline-secondary" type="button">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                    <div className="navbar navbar-light flex-fill justify-content-end">
                        <NavLink className="nav-link fs-5 ms-2 d-none d-md-inline" exact to="/">
                            <i className="bi bi-house-door"></i>
                        </NavLink>
                        {path !== '/setting' && (
                            <NavLink className="nav-link fs-5 ms-3 d-md-none" to="/post/create">
                                <i className="bi bi-plus-square"></i>
                            </NavLink>
                        )}
                        <NavLink className="nav-link fs-5 ms-3 d-none d-md-flex" to="/post/create">
                            <i className="bi bi-plus-square"></i>
                        </NavLink>
                        {path === '/profile' || path === '/setting' ? (
                            <>
                                {path !== '/setting' && (
                                    <NavLink
                                        className="nav-link fs-5 ms-3 d-md-none"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight"
                                        aria-controls="offcanvasRight"
                                        to="/setting"
                                    >
                                        <i className="bi bi-gear"></i>
                                    </NavLink>
                                )}
                                <NavLink className="nav-link fs-5 ms-3 d-none d-md-inline" to="#">
                                    <i className="bi bi-heart"></i>
                                </NavLink>
                                <NavLink className="nav-link fs-5 ms-3 d-none d-md-inline position-relative" to="#">
                                    <i className="bi bi-chat-square-dots"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle p-1 mt-1 bg-primary border border-light rounded-circle">
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="nav-link fs-5 ms-3" to="#">
                                    <i className="bi bi-heart"></i>
                                </NavLink>
                                <NavLink className="nav-link fs-5 ms-3 position-relative" to="#">
                                    <i className="bi bi-chat-square-dots"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle p-1 mt-1 bg-primary border border-light rounded-circle">
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </NavLink>
                            </>
                        )}
                        <NavLink // md avatar
                            className="nav-link fs-5 ms-3 d-none d-md-flex align-items-center"
                            to="/profile"
                        >
                            <Avatar width={23} thumbnail="false" />
                        </NavLink>
                    </div>
                </div>
            </nav>
            <SettingPopUp />
        </>
    )
}
