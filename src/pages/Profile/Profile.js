import { Link } from 'react-router-dom'
import { useEffect } from 'react'

// state management
import { useSelector, useDispatch } from 'react-redux'

import { fetchPost, getPostValue, getPostStatus, getPostError } from '../../redux/post'

// hooks
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

// components
import PostGrid from './PostGrid'
import PostGridPlaceholder from './PostGridPlaceholder'
import Avatar from '../../components/Avatar/Avatar'

export default function Profile() {
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.value)
    const userId = currentUser._id

    const userPosts = useSelector(getPostValue)
    const postStatus = useSelector(getPostStatus)
    const error = useSelector(getPostError)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPost(userId))
        }
    }, [postStatus, dispatch, userId])

    const containerClass = (w) => `container pb-5 ${w >= 992 ? 'w-50' : ''}`

    return (
        <div className={containerClass(width)}>
            <div className="row d-flex my-5">
                <div className="col-6 col-md-4 d-md-flex d-none align-items-center justify-content-center">
                    <Avatar width={150} />
                </div>
                <div className="col-sm-12 col-md-8">
                    <div className="d-none d-md-flex align-items-center mb-3">
                        <span className="fs-5 me-5">{currentUser.username}</span>
                        <button className="btn btn-sm btn-outline-info me-3 d-none d-md-block">
                            <Link to="/setting" className="text-decoration-none">
                                Edit profile
                            </Link>
                        </button>
                        <Link to="#">
                            <i className="bi bi-gear-wide fs-5 d-none d-md-block"></i>
                        </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-md-start justify-content-center mb-4">
                        <div className="row w-md-100">
                            <div className="col d-md-none">
                                <Avatar width={100} />
                            </div>
                            <div className="col d-flex align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex flex-column flex-md-row align-items-center me-lg-5 me-3">
                                        <span className="fs-6 fw-semibold me-1">{userPosts ? userPosts.length : '0'}</span>
                                        <span className="fs-6 fw-light">posts</span>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-center me-lg-5 me-3">
                                        <span className="fs-6 fw-semibold me-1">{currentUser.followers.length}</span>
                                        <span className="fs-6 fw-light">followers</span>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-center">
                                        <span className="fs-6 fw-semibold me-1">{currentUser.following.length}</span>
                                        <span className="fs-6 fw-light">following</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column ms-3 ms-md-0">
                        <span className="fw-bold fs-6">{currentUser.name}</span>
                        <p className="fs-6">{currentUser.desc}</p>
                    </div>
                </div>
            </div>
            <div className="text-success">
                <hr />
            </div>
            <div className="row justify-content-center">
                {postStatus === 'loading' && <PostGridPlaceholder />}
                {userPosts && <PostGrid post={userPosts} currentUser={currentUser} />}
                {error && <h1>Not found</h1>}
            </div>
        </div>
    )
}
