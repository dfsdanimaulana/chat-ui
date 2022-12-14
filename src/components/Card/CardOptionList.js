import cogoToast from 'cogo-toast'
import { useUpdatePost } from '../../hooks/useUpdatePost'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useAuth } from '../../hooks/useAuth'

export default function CardOptionList({ post, setIsOpen }) {
    const axiosPrivate = useAxiosPrivate()
    const updatePostState = useUpdatePost()
    const { user } = useAuth()

    const handleDelete = () => {
        setIsOpen && setIsOpen(false)
        const { hide } = cogoToast.loading('Deleting post...')

        axiosPrivate
            .delete('/post/' + post._id)
            .then(() => {
                hide()
                cogoToast.success('Post deleted')
                // handle post state after deleting one
                updatePostState(user._id)
            })
            .catch(() => {
                hide()
                cogoToast.error('Failed to delete post!')
            })
    }

    const handleSavePost = async () => {
        setIsOpen && setIsOpen(false)
        try {
            const savePost = await axiosPrivate.put('/post/save', {
                postId: post._id,
                userId: user._id
            })
            cogoToast.success(savePost.data.message)
            updatePostState(user._id)
        } catch (err) {
            cogoToast.error(err.message)
        }
    }

    return (
        <ul className="list-group list-group-flush">
            {post.user._id === user._id && <li className="list-group-item bg-light cursor-pointer">Edit post</li>}
            <li className="list-group-item bg-light cursor-pointer" onClick={handleSavePost} data-bs-dismiss="offcanvas">
                {user.savedPost && user.savedPost.filter((pst) => pst._id === post._id).length
                    ? 'Remove from favorites'
                    : 'Add to favorites'}
            </li>
            <li className="list-group-item bg-light cursor-pointer">About this account</li>
            <li className="list-group-item bg-light cursor-pointer">Unfollow</li>
            {post.user._id === user._id && (
                <li
                    data-bs-dismiss="offcanvas"
                    className="list-group-item bg-light text-danger cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete post
                </li>
            )}
        </ul>
    )
}
