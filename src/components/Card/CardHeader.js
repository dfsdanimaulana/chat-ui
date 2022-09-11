import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import cogoToast from 'cogo-toast'
import { fetchUser, getUserValue } from '../../redux/user'

export default function CardHeader({ post, width, setIsOpen, id }) {
    const currentUser = useSelector(getUserValue)
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    const [isPending, setIsPending] = useState(false)

    const handleSavePost = async () => {
        setIsPending(true)

        try {
            const savePost = await axiosPrivate.put('/post/save', {
                postId: post._id,
                userId: currentUser._id
            })

            setIsPending(false)
            cogoToast.success(savePost.data.message)
            dispatch(fetchUser(currentUser._id))
        } catch (err) {
            cogoToast.error(err.message)
            setIsPending(false)
        }
    }

    return (
        <>
            <div>
                <Avatar width={42} image={post.user.img_thumb} />
                <span className="card-title fs-6 fw-bold ms-2 text-secondary">{post.user.username}</span>
            </div>
            <div className="fs-6">
                {isPending ? (
                    <span
                        className="spinner-border spinner-border-sm text-secondary ms-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                ) : (
                    <span>
                        <i
                            className={
                                currentUser.savedPost &&
                                currentUser.savedPost.filter((savedPost) => savedPost._id === post._id).length === 0
                                    ? 'bi bi-bookmark'
                                    : 'bi bi-bookmark-fill'
                            }
                            onClick={handleSavePost}
                        ></i>
                    </span>
                )}

                <span
                    data-bs-toggle={width < 768 && 'offcanvas'}
                    data-bs-target={width < 768 && '#offcanvasCard' + id}
                    aria-controls={width < 768 && 'offcanvasCard'}
                    onClick={() => width >= 768 && setIsOpen(true)}
                >
                    <i className="bi bi-three-dots-vertical ms-3"></i>
                </span>
            </div>
        </>
    )
}
