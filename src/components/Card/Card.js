import { useState } from 'react'

// helpers
import moment from 'moment'

// hooks
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

// components
import CardComment from './CardComment'
import CardModal from '../Modal/CardModal'
import Avatar from '../Avatar/Avatar'
import CardPopup from './CardPopup'

export default function Card({ post, id }) {
    const [isOpen, setIsOpen] = useState(false)
    const { width } = useWindowDimensions()

    const handleImageClass = (w) => {
        return `d-block w-100 ${w > 768 ? 'rounded-start' : 'rounded-top'}`
    }

    const imagesPostStyles = (w) => {
        const size = w < 768 ? '390px' : '470px'
        return {
            height: size,
            width: '100%',
            objectFit: 'cover',
        }
    }

    return (
        <div className='card mb-3'>
            <div className='row g-0'>
                <div className='col-md-6'>
                    {post.img_post_url.length > 1 ? (
                        <div
                            id={id}
                            className='carousel slide'
                            data-bs-ride='true'>
                            <div className='carousel-indicators'>
                                <button
                                    type='button'
                                    data-bs-target={`#${id}`}
                                    data-bs-slide-to={0}
                                    className='active'
                                    aria-current='true'
                                    aria-label='Slide 1'
                                />
                                {post.img_post_url.slice(1).map((_, i) => (
                                    <button
                                        key={i}
                                        type='button'
                                        data-bs-target={`#${id}`}
                                        data-bs-slide-to={i + 1}
                                        aria-current='false'
                                        aria-label={`Slide ${i + 2}`}
                                    />
                                ))}
                            </div>
                            <div className='carousel-inner'>
                                <div className='carousel-item active'>
                                    <img
                                        src={post.img_post_url[0]}
                                        className={handleImageClass(width)}
                                        alt='...'
                                        style={imagesPostStyles(width)}
                                    />
                                </div>
                                {post.img_post_url.slice(1).map((item, i) => (
                                    <div className='carousel-item' key={i}>
                                        <img
                                            src={item}
                                            className={handleImageClass(width)}
                                            alt='...'
                                            style={imagesPostStyles(width)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className='carousel-control-prev'
                                type='button'
                                data-bs-target={`#${id}`}
                                data-bs-slide='prev'>
                                <span
                                    className='carousel-control-prev-icon'
                                    aria-hidden='true'
                                />
                                <span className='visually-hidden'>
                                    Previous
                                </span>
                            </button>
                            <button
                                className='carousel-control-next'
                                type='button'
                                data-bs-target={`#${id}`}
                                data-bs-slide='next'>
                                <span
                                    className='carousel-control-next-icon'
                                    aria-hidden='true'
                                />
                                <span className='visually-hidden'>Next</span>
                            </button>
                        </div>
                    ) : (
                        <img
                            id={id}
                            src={post.img_post_url[0]}
                            className={handleImageClass(width)}
                            alt='...'
                            style={imagesPostStyles(width)}
                        />
                    )}
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-between position-relative'>
                    <div className='card-body d-flex flex-column'>
                        <div className='mt-2 mb-3 d-flex justify-content-between'>
                            <div>
                                <Avatar
                                    width={42}
                                    image={post.user.img_thumb}
                                />
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
                                    data-bs-target={
                                        width < 768 && '#offcanvasCard' + id
                                    }
                                    aria-controls={
                                        width < 768 && 'offcanvasCard'
                                    }
                                    onClick={() =>
                                        width >= 768 && setIsOpen(true)
                                    }>
                                    <i className='bi bi-three-dots-vertical ms-3'></i>
                                </span>
                            </div>
                        </div>
                        <p className='card-text'>{post.caption}</p>
                        <div className='my-1 d-flex'>
                            {post.hashtag.map((h, i) => (
                                <span
                                    key={i}
                                    className='text-primary me-1 fw-light'
                                    style={{
                                        cursor: 'pointer',
                                    }}>
                                    #{h}
                                </span>
                            ))}
                        </div>
                        <p className='card-text mt-auto'>
                            <small className='text-muted'>
                                {moment(post.createdAt).fromNow()}
                            </small>
                        </p>
                    </div>
                    <div className='card-footer d-flex justify-content-between'>
                        <CardComment />
                        <div className='d-flex justify-content-around align-items-center text-secondary fw-bold'>
                            <span className='fw-lighter text-secondary ms-3'>
                                {post.comment.length}
                            </span>
                            <i className='bi bi-chat-left-dots ms-2'></i>
                            <span className='fw-lighter text-secondary ms-3'>
                                {post.like.length}
                            </span>
                            <i className='bi bi-heart ms-2'></i>
                        </div>
                    </div>
                    <CardPopup id={id} data={post} />
                    <CardModal
                        id={id}
                        data={post}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </div>
            </div>
        </div>
    )
}
