/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { BrowserRouter as Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

/** Components */
import PostComment from './PostComment'

/** Utils */
import axios from 'axios'
import BASE_URL from '../../config'

// style
import './Post.css'

export default function Post({ post }) {
    const currentUser = useSelector((state) => state.user.value)
    const [likes, setLikes] = useState(post.isLiked)
    const [likeCount, setLikeCount] = useState(0)
    const [commentMessage, setCommentMessage] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState()

    const handleLikes = () => {
        if (likes) {
            setLikes(false)
            setLikeCount(0)
        } else {
            setLikes(true)
            setLikeCount(1)
        }
    }

    const handleComment = (event) => {
        event.preventDefault()
        setIsPending(true)

        if (commentMessage === '') return false

        axios
            .post(`${BASE_URL}/comment`, {
                senderId: currentUser._id,
                postId: post._id,
                msg: commentMessage
            })
            .then((res) => {
                setCommentMessage('')
                console.log(res.data)
            })
            .catch((error) => {
                setCommentMessage('')
                setError('failed to add comment')
                console.log(error.message)
            })

        setIsPending(true)
    }

    return (
        <div className='card card-widget'>
            <div className='card-header'>
                <div className='user-block'>
                    <img
                        className='img-circle post-profile-image'
                        src='https://source.unsplash.com/random/128x128'
                        alt='Not found'
                    />
                    <span className='username'>
                        <Link to='/'>{post.user.username}</Link>
                    </span>
                    <span className='description'>
                        Shared publicly -{moment(post.createdAt).fromNow()}
                    </span>
                </div>
                {/* /.user-block */}
                <div className='card-tools'>
                    <button
                        type='button'
                        className='btn btn-tool'
                        title='Mark as read'
                    >
                        <i className='far fa-circle' />
                    </button>
                </div>
                {/* /.card-tools */}
            </div>
            {/* /.card-header */}
            <div className='card-body'>
                <img
                    className='img-fluid pad mb-3 post-image'
                    src={post.img_post_url}
                    alt='Not Found'
                />

                <button
                    type='button'
                    className='btn btn-default btn-sm'
                    onClick={handleLikes}
                >
                    {likes ? (
                        <i className='fas fa-heart' />
                    ) : (
                        <i className='far fa-heart' />
                    )}
                </button>
                <button
                    type='button'
                    className='btn btn-default btn-sm'
                    data-bs-toggle='collapse'
                    data-bs-target={`#comment${post._id}`}
                    aria-expanded='false'
                    aria-controls='commentArea'
                >
                    <i className='far fa-comment' />
                </button>
                <button type='button' className='btn btn-default btn-sm'>
                    <i className='fas fa-share' />
                </button>

                <span className='float-right text-muted'>
                    {likeCount} likes - {post.comment.length} comments
                </span>
                <p className='mt-3'>{post.caption}</p>
                {post.hashtag.length > 0 && (
                    <div className='my-2 fst-italic'>
                        {post.hashtag.map((v, i) => (
                            <Link to='#' key={i} className='fst-italic'>
                                {`#${v} `}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            {/* /.card-body */}
            <PostComment post={post} />
            {/* <div
                className='card-footer card-comments collapse'
                id={`comment${post._id}`}>
                {post.comment &&
                    post.comment.map((comment) => (
                        <PostComment key={comment._id} comment={comment} />
                    ))}
            </div>*/}
            {/* /.card-comment */}
            {/* /.card-footer */}
            <div className='card-footer'>
                <form onSubmit={handleComment}>
                    <img
                        className='img-fluid img-circle img-sm'
                        src='https://source.unsplash.com/random/128x128'
                        alt='Alt Text'
                    />
                    {/* .img-push is used to add margin to elements next to floating images */}
                    <div className='img-push'>
                        <input
                            type='text'
                            value={commentMessage}
                            className='form-control form-control-sm'
                            placeholder='Press enter to post comment'
                            onChange={(e) => setCommentMessage(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            {/* /.card-footer */}
        </div>
    )
}
