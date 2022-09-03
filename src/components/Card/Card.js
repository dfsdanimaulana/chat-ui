import { useState, useRef } from 'react'

// state management
import { useSelector } from 'react-redux'
import { getCommentsValue } from '../../redux/comments'

// hooks
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

// components
import CardCommentInput from './CardCommentInput'
import CardModal from '../Modal/CardModal'
import CardPopup from './CardPopup'
import CardImage from './CardImage'
import CardCaption from './CardCaption'
import CardComment from './CardComment'

export default function Card({ post, id }) {
    const allComments = useSelector(getCommentsValue)
    const comments = allComments.filter(
        (comment) => comment.postId === post._id
    )

    const [isOpen, setIsOpen] = useState(false)
    const [commentOpen, setCommentOpen] = useState(false)

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

    return (
        <div className='card mb-3' style={cardStyle(width)}>
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
