import { useState } from 'react'
import Avatar from '../Avatar/Avatar'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import cogoToast from 'cogo-toast'
import { useUser } from '../../hooks/useUser'
import { usePosts } from '../../hooks/usePosts'
import { usePost } from '../../hooks/usePost'

export default function CardHeader({ post, width, setIsOpen, id }) {
    const axiosPrivate = useAxiosPrivate()
    const { user, getUser } = useUser()
    const { getPosts } = usePosts()
    const { getPost } = usePost()
    const [isPending, setIsPending] = useState(false)

    const handleSavePost = async () => {
        setIsPending(true)

        try {
            const savePost = await axiosPrivate.put('/post/save', {
                postId: post._id,
                userId: user._id
            })

            setIsPending(false)
            cogoToast.success(savePost.data.message)
            getUser(user._id)
            getPosts()
            getPost(user._id)
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
                                user.savedPost && user.savedPost.filter((savedPost) => savedPost._id === post._id).length
                                    ? 'bi bi-bookmark-fill'
                                    : 'bi bi-bookmark'
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
