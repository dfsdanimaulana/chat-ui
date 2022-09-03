// helpers
import moment from 'moment'

import Avatar from '../Avatar/Avatar'

export default function CardCaption({post, width, setIsOpen, id}) {
    return (
        <div className='p-3'>
            <div className='mt-2 mb-3 d-flex justify-content-between'>
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
                        onClick={() => width >= 768 && setIsOpen(true)}>
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
    )
}
