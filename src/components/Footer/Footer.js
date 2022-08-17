import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
            <footer className='py-3 navbar navbar-expand navbar-dark position-fixed bottom-0 start-0 end-0 d-md-none d-block'>
                <ul className='navbar-nav d-flex justify-content-around'>
                    <li className='navbar-item'>
                        <Link className='navbar-link link-light' to='/'>
                            <i className='fas fa-home'></i>
                        </Link>
                    </li>
                    <li className='navbar-item'>
                        <Link className='navbar-link link-light' to='/add-post'>
                            <i className='fas fa-plus-square'></i>
                        </Link>
                    </li>
                    <li className='navbar-item'>
                        <Link className='navbar-link link-light' to='/user'>
                            <i className='fas fa-user-circle'></i>
                        </Link>
                    </li>
                </ul>
            </footer>
        )
}

export default Footer