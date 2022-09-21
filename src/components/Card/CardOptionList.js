// helpers
import cogoToast from 'cogo-toast'

// state management
import { useUpdatePost } from '../../hooks/useUpdatePost'

// hooks
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useUser } from '../../hooks/useUser'
const listStyle = {
    cursor: 'pointer'
}

export default function CardOptionList({ data, setIsOpen }) {
    const axiosPrivate = useAxiosPrivate()
    const updatePostState = useUpdatePost()
    const { user, getUser } = useUser()

    const handleDelete = () => {
        setIsOpen && setIsOpen(false)
        const { hide } = cogoToast.loading('Deleting post...')

        axiosPrivate
            .delete('/post/' + data._id)
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
                postId: data._id,
                userId: user._id
            })
            cogoToast.success(savePost.data.message)
            getUser(user._id)
        } catch (err) {
            cogoToast.error(err.message)
        }
    }

    return (
        <ul className="list-group list-group-flush">
            {data.user._id === user._id && (
                <li className="list-group-item bg-light" style={listStyle}>
                    Edit post
                </li>
            )}
            <li className="list-group-item bg-light" style={listStyle} onClick={handleSavePost} data-bs-dismiss="offcanvas">
                {user.savedPost && !user.savedPost.filter((post)=> post._id === data._id).length ? 'Add to favorites' : 'Remove from favorites'}
            </li>
            <li className="list-group-item bg-light" style={listStyle}>
                About this account
            </li>
            <li className="list-group-item bg-light" style={listStyle}>
                Unfollow
            </li>
            {data.user._id === user._id && (
                <li
                    data-bs-dismiss="offcanvas"
                    className="list-group-item bg-light text-danger"
                    onClick={handleDelete}
                    style={listStyle}
                >
                    Delete post
                </li>
            )}
        </ul>
    )
}
