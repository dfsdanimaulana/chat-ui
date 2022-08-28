import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import Avatar from '../Avatar/Avatar'
import moment from 'moment'
import CardComment from './CardComment'
/*
const fakeImages = [
    'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ',
    'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ',
    'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
    'https://i.picsum.photos/id/100/2500/1656.jpg?hmac=gWyN-7ZB32rkAjMhKXQgdHOIBRHyTSgzuOK6U0vXb1w',
    'https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g',
]
*/
export default function Card({ post, id }) {
    // @typeof post Array
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
                            src={post.img_post_url[0]}
                            className={handleImageClass(width)}
                            alt='...'
                            style={imagesPostStyles(width)}
                        />
                    )}
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-between'>
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
                                <i className='bi bi-bookmark'></i>
                                <i className='bi bi-three-dots-vertical ms-3'></i>
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
                </div>
            </div>
        </div>
    )
}
