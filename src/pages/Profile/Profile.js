import Avatar from '../../components/Avatar/Avatar'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import PostGrid from './PostGrid'
import { useSelector } from 'react-redux'

export default function Profile() {
    const { width } = useWindowDimensions()
    const currentUser = useSelector((state) => state.user.value) // @typeof currentUser Object

    const containerClass = (w) => `container ${w >= 992 ? 'w-50' : ''}`

    return (
        <div className={containerClass(width)}>
            <div className='row d-flex my-5'>
                <div className='col-6 col-md-4 d-md-flex d-none align-items-center justify-content-center'>
                    <Avatar width={150} />
                </div>
                <div className='col-sm-12 col-md-8'>
                    <div className='d-none d-md-flex align-items-center mb-3'>
                        <span className='fs-5 me-5'>
                            {currentUser.username}
                        </span>
                        <button className='btn btn-sm btn-outline-info me-3 d-none d-md-block'>
                            Edit profile
                        </button>
                        <i className='bi bi-gear-wide fs-5 d-none d-md-block'></i>
                    </div>
                    <div className='d-flex align-items-center justify-content-md-start justify-content-center mb-4'>
                        <div className='row w-md-100'>
                            <div className='col d-md-none'>
                                <Avatar width={100} />
                            </div>
                            <div className='col d-flex align-items-center'>
                                <div className='d-flex align-items-center'>
                                    <div className='d-flex flex-column flex-md-row align-items-center me-lg-5 me-3'>
                                        <span className='fs-6 fw-semibold me-1'>
                                            {currentUser.post.length}
                                        </span>
                                        <span className='fs-6 fw-light'>
                                            posts
                                        </span>
                                    </div>
                                    <div className='d-flex flex-column flex-md-row align-items-center me-lg-5 me-3'>
                                        <span className='fs-6 fw-semibold me-1'>
                                            {currentUser.followers.length}
                                        </span>
                                        <span className='fs-6 fw-light'>
                                            followers
                                        </span>
                                    </div>
                                    <div className='d-flex flex-column flex-md-row align-items-center'>
                                        <span className='fs-6 fw-semibold me-1'>
                                            {currentUser.following.length}
                                        </span>
                                        <span className='fs-6 fw-light'>
                                            following
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column ms-3 ms-md-0'>
                        <span className='fw-bold fs-6'>{currentUser.name}</span>
                        <p className='fs-6'>{currentUser.desc}</p>
                    </div>
                </div>
            </div>
            <div className='text-success'>
                <hr />
            </div>
            <div className='row justify-content-center'>
                <PostGrid posts={currentUser.post} />
            </div>
        </div>
    )
}
