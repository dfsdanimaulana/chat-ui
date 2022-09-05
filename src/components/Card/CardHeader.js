import React from 'react'
import Avatar from '../Avatar/Avatar'

export default function CardHeader({ post, width, setIsOpen, id }) {
    return (
        <>
            <div>
                <Avatar width={42} image={post.user.img_thumb} />
                <span className='card-title fs-6 fw-bold ms-2 text-secondary'>
                    {post.user.username}
                </span>
            </div>
            <div className='fs-6'>
                <span>
                    <i className='bi bi-bookmark'></i>
                </span>
                <span
                    data-bs-toggle={width < 768 && 'offcanvas'}
                    data-bs-target={width < 768 && '#offcanvasCard' + id}
                    aria-controls={width < 768 && 'offcanvasCard'}
                    onClick={() => width >= 768 && setIsOpen(true)}
                >
                    <i className='bi bi-three-dots-vertical ms-3'></i>
                </span>
            </div>
        </>
    )
}
