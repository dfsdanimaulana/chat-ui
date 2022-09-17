import { useState, useRef } from 'react'

// helpers
import cogoToast from 'cogo-toast'

// hooks
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useComments } from '../../hooks/useComments'
import { useUser } from '../../hooks/useUser'
import { usePosts } from '../../hooks/usePosts'

// components
import CardCommentInput from './CardCommentInput'
import CardModal from '../Modal/CardModal'
import CardPopup from './CardPopup'
import CardImage from './CardImage'
import CardCaption from './CardCaption'
import CardComment from './CardComment'
import CardHeader from './CardHeader'

export default function Card({ post, id }) {
    const axiosPrivate = useAxiosPrivate()
    const { comments: allComments } = useComments()
    const { user, getUser } = useUser()
    const { status, getPosts } = usePosts()

    const comments = allComments.filter((comment) => comment.postId === post._id)

    const [isOpen, setIsOpen] = useState(false)
    const [commentOpen, setCommentOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const { width } = useWindowDimensions()
    const ref = useRef()
    const cardBodyRef = useRef()

    const cardStyle = (w) => {
        return {
            height: w >= 768 ? '470px' : 'max-content'
        }
    }

    const handleLikeClick = async () => {
        if (status === 'loading' || isPending) return

        // push user id to post like array
        setIsPending(true)
        axiosPrivate
            .put('/post/like', {
                postId: post._id,
                userId: user._id
            })
            .then(() => {
                getPosts()
                getUser(user._id)
            })
            .catch((err) => cogoToast.error(err.message))
            .finally(() => setIsPending(false))
    }

    const likeIconClass = () =>
        post.like.filter((user) => user._id === user._id).length > 0 ? 'bi bi-heart-fill ms-2' : 'bi bi-heart ms-2'

    return (
        <div className="card mb-3" style={cardStyle(width)}>
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
                            />
                        ) : (
                            <CardCaption id={id} post={post} width={width} setIsOpen={setIsOpen} />
                        )}
                    </div>
                    <div ref={ref} className="card-footer d-flex justify-content-between">
                        <CardCommentInput postId={post._id} setCommentOpen={setCommentOpen} />
                        <div className="d-flex justify-content-around align-items-center text-secondary fw-bold">
                            <span className="fw-lighter text-secondary ms-3">{comments.length}</span>
                            <i className="bi bi-chat-left-dots ms-2" onClick={() => setCommentOpen((val) => !val)}></i>
                            <span className="fw-lighter text-secondary ms-3">{post.like.length}</span>
                            {status === 'loading' || isPending ? (
                                <span
                                    className="spinner-border spinner-border-sm text-secondary ms-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            ) : (
                                <i className={likeIconClass()} onClick={handleLikeClick}></i>
                            )}
                        </div>
                    </div>
                    <CardPopup id={id} data={post} />
                    <CardModal id={id} data={post} isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            </div>
        </div>
    )
}
