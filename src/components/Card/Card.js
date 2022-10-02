import { useState, useRef } from 'react'

// helpers
import cogoToast from 'cogo-toast'

// hooks
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useComments } from '../../hooks/useComments'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/usePosts'

// components
import CardCommentInput from './CardCommentInput'
import CardModal from './CardModal'
import CardPopup from './CardPopup'
import CardImage from './CardImage'
import CardCaption from './CardCaption'
import CardComment from './CardComment'
import CardHeader from './CardHeader'

export default function Card({ post, id }) {
    const axiosPrivate = useAxiosPrivate()
    const { comments: allComments } = useComments()
    const { user, getUser } = useAuth()
    const { status, getPosts } = usePosts()

    const comments = allComments.filter((comment) => comment.postId === post._id)

    const [isOpen, setIsOpen] = useState(false)
    const [commentOpen, setCommentOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const { width } = useWindowDimensions()
    const ref = useRef()
    const cardBodyRef = useRef()

    const handleLikeClick = async () => {
        if (status === 'loading' || isPending) return

        setIsPending(true)
        axiosPrivate
            .put('/post/like', {
                postId: post._id,
                userId: user._id
            })
            .then(() => {
                getPosts()
                getUser(user._id)
                setIsPending(false)
            })
            .catch((err) => {
                setIsPending(false)
                cogoToast.error(err.message)
            })
    }

    const handleCommentClick = () => {
        if (width >= 768) setCommentOpen((val) => !val)
        // handle comment open in mobile
    }

    return (
        <div
            className="card mb-3"
            style={{
                height: width >= 768 ? '470px' : 'max-content'
            }}
        >
            <div className="d-flex d-md-none justify-content-between align-items-center p-1 pe-2">
                <CardHeader post={post} width={width} setIsOpen={setIsOpen} id={id} />
            </div>
            <div className="row g-0 h-100">
                <CardImage width={width} post={post} id={id} />
                <div ref={cardBodyRef} className="col-md-6 d-flex flex-column justify-content-between">
                    <div className="card-body d-flex flex-column p-0">
                        {commentOpen ? (
                            <CardComment
                                post={post}
                                height={cardBodyRef.current.clientHeight - ref.current.clientHeight}
                                comments={comments}
                                setIsOpen={setIsOpen}
                                id={id}
                            />
                        ) : (
                            <CardCaption id={id} post={post} width={width} setIsOpen={setIsOpen} />
                        )}
                    </div>
                    <div ref={ref} className="card-footer d-flex justify-content-between">
                        <CardCommentInput postId={post._id} setCommentOpen={setCommentOpen} />
                        <div className="d-flex justify-content-around align-items-center text-secondary fw-bold">
                            <span className="fw-lighter text-secondary ms-3">{comments.length}</span>
                            <i className="bi bi-chat-left-dots ms-2" onClick={handleCommentClick}></i>
                            <span className="fw-lighter text-secondary ms-3">{post.like.length}</span>
                            {isPending ? (
                                <span
                                    className="spinner-border spinner-border-sm text-secondary ms-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            ) : (
                                <i
                                    className={
                                        post.like.filter((u) => u._id === user._id).length > 0
                                            ? 'bi bi-heart-fill ms-2'
                                            : 'bi bi-heart ms-2'
                                    }
                                    onClick={handleLikeClick}
                                ></i>
                            )}
                        </div>
                    </div>
                    <CardPopup id={id} post={post} />
                    <CardModal id={id} post={post} isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            </div>
        </div>
    )
}
