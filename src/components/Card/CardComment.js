import { useState, useRef } from 'react'
import cogoToast from 'cogo-toast'
import moment from 'moment'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useAuth } from '../../hooks/useAuth'
import { useComments } from '../../hooks/useComments'

// components
import Avatar from '../Avatar/Avatar'

export default function CardComment({ post, height, comments, setIsOpen, id }) {
    const { width } = useWindowDimensions()
    return (
        <div className="h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div>
                    <Avatar width={24} thumbnail="false" image={post.user.img_thumb} />
                    <span className="card-title fs-6 fw-bold ms-2 text-secondary">{post.user.username}</span>
                </div>
                <span
                    data-bs-toggle={width < 768 && 'offcanvas'}
                    data-bs-target={width < 768 && '#offcanvasCard' + id}
                    aria-controls={width < 768 && 'offcanvasCard'}
                    onClick={() => width >= 768 && setIsOpen(true)}
                >
                    <i className="bi bi-three-dots-vertical ms-3"></i>
                </span>
            </div>
            <div
                className="card-body p-0 overflow-auto"
                style={{
                    height: `${height - 45}px`
                }}
            >
                <ul className="list-group list-group-flush ">
                    {comments && comments.reverse().map((comment) => <Comment key={comment._id} comment={comment} />)}
                </ul>
            </div>
        </div>
    )
}

function Comment({ comment }) {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()
    const { getComments } = useComments()
    const [isPending, setIsPending] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleLike = () => {
        setIsPending(true)
        axiosPrivate
            .post('/comment/' + comment._id, {
                userId: user._id
            })
            .then((res) => {
                getComments()
                setIsPending(false)
            })
            .catch((err) => {
                setIsPending(false)
                cogoToast.error(err.message)
            })
    }

    return (
        <li className="list-group-item border-none position-relative">
            <div className="row">
                <div className="col-1 d-flex justify-content-center align-items-center pt-2">
                    <Avatar width={24} thumbnail="false" image={comment.sender.img_thumb} />
                </div>
                <div className="col-8 col-md-9">
                    <div className="mb-1">
                        <span className="fw-semibold me-1">{comment.sender.username}</span>
                        <span>{comment.msg}</span>
                    </div>
                    <div className="fs-7">
                        <span className="me-2">{moment(comment.createdAt).fromNow(true)}</span>
                        <span className="me-2">{comment.like.length} likes</span>
                        <span className="me-1 fw-semibold cursor-pointer">Replay</span>
                    </div>
                </div>
                <div className="col-3 col-md-2 d-flex justify-content-around pt-2">
                    {isPending ? (
                        <span
                            className="spinner-border spinner-border-sm text-secondary me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    ) : (
                        <i
                            className={comment.like.includes(user._id) ? 'bi bi-heart-fill me-2' : 'bi bi-heart me-2'}
                            onClick={handleLike}
                        ></i>
                    )}
                    <i className="bi bi-three-dots text-secondary fs-7" onClick={() => setIsOpen((val) => !val)}></i>
                </div>
            </div>
            {isOpen && <CommentPopup setIsOpen={setIsOpen} user={user} comment={comment} />}
        </li>
    )
}

const CommentPopup = ({ setIsOpen, user, comment }) => {
    const axiosPrivate = useAxiosPrivate()
    const { getComments } = useComments()
    const ref = useRef()
    useOnClickOutside(ref, () => {
        setIsOpen((val) => !val)
    })

    const handleDelete = () => {
        axiosPrivate.delete('/comment/' + comment._id).then(() => {
            getComments()
        })
    }

    return (
        <div className="card position-absolute top-0 end-0 mt-1 me-5" ref={ref}>
            <ul className="list-group list-group-flush">
                {user._id === comment.sender._id ? (
                    <li className="list-group-item fs-7 text-secondary cursor-pointer" onClick={handleDelete}>
                        Delete
                    </li>
                ) : (
                    <li className="list-group-item fs-7 text-secondary cursor-pointer">Report</li>
                )}
            </ul>
        </div>
    )
}
