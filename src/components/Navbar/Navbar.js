import { Link, NavLink, useRouteMatch } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

export default function Navbar() {
    const { path } = useRouteMatch()
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary mb-3 shadow-sm sticky-top'>
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
                    <NavLink className='nav-link fs-5 ms-2 d-none d-md-inline' exact to='/'>
                        <i className='bi bi-house-door'></i>
                    </NavLink>
                    <NavLink className='nav-link fs-5 ms-3' to='/post/create'>
                        <i className='bi bi-plus-square'></i>
                    </NavLink>
                     {path === '/profile'? (
                        <>
                          <NavLink className='nav-link fs-5 ms-3 d-md-none' to='#'>
                              <i className='bi bi-gear'></i>
                          </NavLink>
                          <NavLink className='nav-link fs-5 ms-3 d-none d-md-inline' to='#'>
                              <i className='bi bi-heart'></i>
                          </NavLink>
                          <NavLink className='nav-link fs-5 ms-3 d-none d-md-inline' to='#'>
                              <i className='bi bi-chat-square-dots'></i>
                          </NavLink>
                        </>
                     ):(
                        <>
                          <NavLink className='nav-link fs-5 ms-3' to='#'>
                              <i className='bi bi-heart'></i>
                          </NavLink>
                          <NavLink className='nav-link fs-5 ms-3' to='#'>
                              <i className='bi bi-chat-square-dots'></i>
                          </NavLink>
                        </>
                     )}
                    <NavLink className='nav-link fs-5 ms-3 d-none d-md-flex align-items-center' to='/profile'>
                        <Avatar width={23} thumbnail='false' />
                    </NavLink>
                </div>
            </div>
        </nav>

        // <nav className='main-header shadow-sm navbar navbar-expand navbar-primary navbar-dark position-sticky top-0'>
        //     {/* Left navbar links */}
        //     <ul className='navbar-nav'>
        //         <li className='nav-item'>
        //             <Link
        //                 className='nav-link d-none d-sm-inline-block'
        //                 data-widget='pushmenu'
        //                 onClick={handleArrow}
        //                 to='#'
        //                 role='button'>
        //                 {arrow ? (
        //                     <i className='fas fa-angle-left' />
        //                 ) : (
        //                     <i className='fas fa-angle-right' />
        //                 )}
        //             </Link>
        //             <Link
        //                 className='nav-link navbar-brand d-sm-none d-inline-block'
        //                 to='#'>
        //                 DsTopia
        //             </Link>
        //         </li>
        //     </ul>
        //     {/* Right navbar links */}
        //     <ul className='navbar-nav ml-auto'>
        //         {/* Navbar Search */}
        //         <li className='nav-item'>
        //             <Link
        //                 className='nav-link'
        //                 data-widget='navbar-search'
        //                 data-target='#navbar-search3'
        //                 to='/'
        //                 role='button'>
        //                 <i className='fas fa-search' />
        //             </Link>
        //             <div className='navbar-search-block' id='navbar-search3'>
        //                 <form className='form-inline'>
        //                     <div className='input-group input-group-sm'>
        //                         <input
        //                             className='form-control form-control-navbar'
        //                             type='search'
        //                             placeholder='Search'
        //                             aria-label='Search'
        //                         />
        //                         <div className='input-group-append'>
        //                             <button
        //                                 className='btn btn-navbar'
        //                                 type='submit'>
        //                                 <i className='fas fa-search' />
        //                             </button>
        //                             <button
        //                                 className='btn btn-navbar'
        //                                 type='button'
        //                                 data-widget='navbar-search'>
        //                                 <i className='fas fa-times' />
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </form>
        //             </div>
        //         </li>
        //         {/* Messages Dropdown Menu */}
        //         <li className='nav-item d-none d-sm-inline-block'>
        //             <Link className='nav-link' to='/chats'>
        //                 <i className='far fa-comments' />
        //                 <span className='badge badge-danger navbar-badge'>
        //                     3
        //                 </span>
        //             </Link>
        //         </li>

        //         <li className='nav-item d-none d-sm-inline-block'>
        //             <Link
        //                 className='nav-link'
        //                 data-widget='fullscreen'
        //                 to='#'
        //                 role='button'>
        //                 <i className='fas fa-expand-arrows-alt' />
        //             </Link>
        //         </li>
        //         <li className='nav-item d-sm-none d-inline-block'>
        //             <Link
        //                 className='nav-link'
        //                 data-widget='pushmenu'
        //                 data-slide='true'
        //                 to='#'
        //                 role='button'>
        //                 <i className='fas fa-bars'></i>
        //             </Link>
        //         </li>
        //         <li className='nav-item d-none d-sm-inline-block'>
        //             <Link className='nav-link' to='/login'>
        //                 <span className='badge rounded-pill bg-danger shadow-sm bg-gradient fw-light'>
        //                     LogIn / SignUp
        //                 </span>
        //             </Link>
        //         </li>
        //     </ul>
        // </nav>
    )
}
