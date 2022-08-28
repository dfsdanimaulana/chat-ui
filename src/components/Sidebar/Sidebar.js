import React from 'react'

export default function Sidebar() {
    return (
        <div
            className='offcanvas-md offcanvas-end'
            tabIndex={-1}
            id='offcanvasRight'
            aria-labelledby='offcanvasRightLabel'>
            <div className='offcanvas-header'>
                <h5 className='offcanvas-title' id='offcanvasRightLabel'>
                    Offcanvas right
                </h5>
                <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='offcanvas'
                    aria-label='Close'
                />
            </div>
            <div className='offcanvas-body'>...</div>
        </div>
    )
}
