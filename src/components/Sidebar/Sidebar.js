import React from 'react'
import { Link } from 'react-router-dom'
import SidebarList from './SidebarList'

export default function Sidebar() {
    return (
        <aside className='main-sidebar sidebar-dark-primary elevation-4'>
            {/* Sidebar */}
            <div className='sidebar' id='home-sidebar'>
                {/* Sidebar user panel (optional) */}
                <Link to='/' className='brand-link'>
                    <img
                        src='https://source.unsplash.com/random/40x40'
                        className='img-circle elevation-2 img-fluid'
                        alt='not found'
                    />
                    <span className='brand-text font-weight-light ms-3'>
                        DanApp
                    </span>
                </Link>

                {/* SidebarSearch Form */}
                <div className='form-inline'>
                    <div className='input-group' data-widget='sidebar-search'>
                        <input
                            className='form-control form-control-sidebar'
                            type='search'
                            placeholder='Search'
                            aria-label='Search'
                        />
                        <div className='input-group-append'>
                            <button className='btn btn-sidebar'>
                                <i className='fas fa-search fa-fw' />
                            </button>
                        </div>
                    </div>
                    <div className='sidebar-search-results'>
                        <div className='list-group'>
                            <Link to='/' className='list-group-item'>
                                <div className='search-title'>
                                    <strong className='text-light' />N
                                    <strong className='text-light' />o
                                    <strong className='text-light' />
                                    <strong className='text-light' />e
                                    <strong className='text-light' />l
                                    <strong className='text-light' />e
                                    <strong className='text-light' />m
                                    <strong className='text-light' />e
                                    <strong className='text-light' />n
                                    <strong className='text-light' />t
                                    <strong className='text-light' />
                                    <strong className='text-light' />f
                                    <strong className='text-light' />o
                                    <strong className='text-light' />u
                                    <strong className='text-light' />n
                                    <strong className='text-light' />d
                                    <strong className='text-light' />!
                                    <strong className='text-light' />
                                </div>
                                <div className='search-path' />
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className='mt-2'>
                    <ul
                        className='nav nav-pills nav-sidebar flex-column'
                        data-widget='treeview'
                        role='menu'
                        data-accordion='false'>
                        <SidebarList />
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    )
}
