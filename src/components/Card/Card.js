import { useState, useRef } from 'react'

// helpers
import cogoToast from 'cogo-toast'

// state management
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsValue } from '../../redux/comments'
import { getUserValue } from '../../redux/user'
import { fetchPosts } from '../../redux/posts'
import { fetchPost } from '../../redux/post'

// hooks
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

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
    const allComments = useSelector(getCommentsValue)
    const currentUser = useSelector(getUserValue)
    const dispatch = useDispatch()

    const comments = allComments.filter(
        (comment) => comment.postId === post._id
    )

    const [isOpen, setIsOpen] = useState(false)
    const [commentOpen, setCommentOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const { width } = useWindowDimensions()
    const ref = useRef()
    const cardBodyRef = useRef()

    const cardStyle = (w) => {
        return {
            height: w >= 768 ? '470px' : 'max-content',
        }
    }

    const handleCommentClick = () => {
        setCommentOpen((val) => !val)
    }

    const handleLikeClick = async () => {
        if (isPending) return

        setIsPending(true)
        // push user id to post like array
        axiosPrivate
            .post('/post/like', {
                postId: post._id,
                userId: currentUser._id,
            })
            .then(() => {
                dispatch(fetchPosts())
                dispatch(fetchPost(currentUser._id))
            })
            .catch((err) => {
                cogoToast.error(err.message)
            })
            .finally(() => {
                setIsPending(false)
            })
    }

    const likeIconClass = () => {
        const isLiked = post.like.filter((user) => user._id === currentUser._id)

        return isLiked.length > 0 ? 'bi bi-heart-fill ms-2' : 'bi bi-heart ms-2'
    }

    return (
        <div className='card mb-3' style={cardStyle(width)}>
            <div className='d-flex d-md-none justify-content-between align-items-center p-1 pe-2'>
                <CardHeader
                    post={post}
                    width={width}
                    setIsOpen={setIsOpen}
                    id={id}
                />
            </div>
            <div className='row g-0 h-100'>
                <CardImage width={width} post={post} id={id} />
                <div
                    ref={cardBodyRef}
                    className='col-md-6 d-flex flex-column justify-content-between'>
                    <div className='card-body d-flex flex-column p-0'>
                        {commentOpen ? (
                            <CardComment
                                post={post}
                                height={
                                    cardBodyRef.current.clientHeight -
                                    ref.current.clientHeight
                                }
                                comments={comments}
                            />
                        ) : (
                            <CardCaption
                                id={id}
                                post={post}
                                width={width}
                                setIsOpen={setIsOpen}
                            />
                        )}
                    </div>
                    <div
                        ref={ref}
                        className='card-footer d-flex justify-content-between'>
                        <CardCommentInput postId={post._id} />
                        <div className='d-flex justify-content-around align-items-center text-secondary fw-bold'>
                            <span className='fw-lighter text-secondary ms-3'>
                                {comments.length}
                            </span>
                            <i
                                className='bi bi-chat-left-dots ms-2'
                                onClick={handleCommentClick}></i>
                            <span className='fw-lighter text-secondary ms-3'>
                                {post.like.length}
                            </span>
                            <i
                                className={likeIconClass()}
                                onClick={handleLikeClick}></i>
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
