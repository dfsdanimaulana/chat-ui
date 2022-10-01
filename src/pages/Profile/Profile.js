import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useUser } from '../../hooks/useUser'
import { usePost } from '../../hooks/usePost'
import './Profile.scss'

// components
import Avatar from '../../components/Avatar/Avatar'
import PostGrid from './PostGrid'
import PostGridPlaceholder from './PostGridPlaceholder'

export default function Profile() {
    const { width } = useWindowDimensions()
    const { user } = useUser()

    const { post, status, error, getPost } = usePost()

    useEffect(() => {
        if (status === 'idle') {
            getPost(user._id)
            console.log(user)
        }
    }, [status, user, getPost])

    return (
        <div className={`container pb-5 ${width >= 992 ? 'w-50' : ''}`}>
            <div className="row d-flex my-5">
                <div className="col-6 col-md-4 d-md-flex d-none align-items-center justify-content-center">
                    <Avatar width={150} />
                </div>
                <div className="col-sm-12 col-md-8">
                    <div className="d-none d-md-flex align-items-center mb-3">
                        <span className="fs-5 me-5">{user.username}</span>
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
                                        <span className="fs-6 fw-semibold me-1">{post ? post.length : '0'}</span>
                                        <span className="fs-6 fw-light">posts</span>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-center me-lg-5 me-3">
                                        <span className="fs-6 fw-semibold me-1">{user.followers.length}</span>
                                        <span className="fs-6 fw-light">followers</span>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-center">
                                        <span className="fs-6 fw-semibold me-1">{user.following.length}</span>
                                        <span className="fs-6 fw-light">following</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column ms-3 ms-md-0">
                        <span className="fw-bold fs-6">{user.name}</span>
                        <p className="fs-6">{user.desc}</p>
                    </div>
                </div>
            </div>
            <div className="text-success">
                <hr />
            </div>
            <div className="row justify-content-center">
                {status === 'loading' && <PostGridPlaceholder />}
                {post && <PostGrid post={post} user={user} />}
                {error && <h1>Not found</h1>}
            </div>
        </div>
    )
}
