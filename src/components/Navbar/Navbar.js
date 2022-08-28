import { Link, NavLink, useRouteMatch } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

export default function Navbar() {
    const { path } = useRouteMatch()
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top'>
            <div className='container d-flex'>
                <Link className='navbar-brand flex-fill fw-bold' to='/'>
                    DanApp
                </Link>
                <form className='d-sm-flex flex-fill d-none' role='search'>
                    <input
                        className='form-control form-control-sm me-2'
                        type='search'
                        placeholder='Search'
                        aria-label='Search'
                    />
                    <button
                        className='btn btn-sm btn-outline-light'
                        type='submit'>
                        <i className='bi bi-search'></i>
                    </button>
                </form>
                <div className='navbar text-light flex-fill justify-content-end'>
                    <NavLink
                        className='nav-link fs-5 ms-2 d-none d-md-inline'
                        exact
                        to='/'>
                        <i className='bi bi-house-door'></i>
                    </NavLink>
                    {path !== '/setting' && (
                        <NavLink
                            className='nav-link fs-5 ms-3 d-md-none'
                            to='/post/create'>
                            <i className='bi bi-plus-square'></i>
                        </NavLink>
                    )}
                    <NavLink
                        className='nav-link fs-5 ms-3 d-none d-md-flex'
                        to='/post/create'>
                        <i className='bi bi-plus-square'></i>
                    </NavLink>
                    {path === '/profile' || path === '/setting' ? (
                        <>
                            {path !== '/setting' && (
                                <NavLink
                                    className='nav-link fs-5 ms-3 d-md-none'
                                    to='/setting'>
                                    <i className='bi bi-gear'></i>
                                </NavLink>
                            )}
                            <NavLink
                                className='nav-link fs-5 ms-3 d-none d-md-inline'
                                to='#'>
                                <i className='bi bi-heart'></i>
                            </NavLink>
                            <NavLink
                                className='nav-link fs-5 ms-3 d-none d-md-inline'
                                to='#'>
                                <i className='bi bi-chat-square-dots'></i>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className='nav-link fs-5 ms-3' to='#'>
                                <i className='bi bi-heart'></i>
                            </NavLink>
                            <NavLink className='nav-link fs-5 ms-3' to='#'>
                                <i className='bi bi-chat-square-dots'></i>
                            </NavLink>
                        </>
                    )}
                    <NavLink
                        className='nav-link fs-5 ms-3 d-none d-md-flex align-items-center'
                        to='/profile'>
                        <Avatar width={23} thumbnail='false' />
                    </NavLink>
                    {path === '/setting' && (
                        <NavLink
                            className='nav-link fs-5 ms-3 d-md-none align-items-center'
                            to='#'>
                            <i className='bi bi-three-dots-vertical'></i>
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    )
}
