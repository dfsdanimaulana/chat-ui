// helpers
import cogoToast from 'cogo-toast'

// state management
import { useUpdatePost } from '../../hooks/useUpdatePost'

// hooks
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
const listStyle = {
    cursor: 'pointer'
}

export default function CardOptionList({ data, currentUser, setIsOpen }) {
    const axiosPrivate = useAxiosPrivate()
    const updatePostState = useUpdatePost()

    const handleDelete = () => {
        setIsOpen && setIsOpen(false)
        const { hide } = cogoToast.loading('Deleting post...')

        axiosPrivate
            .delete('/post/' + data._id)
            .then(() => {
                hide()
                cogoToast.success('Post deleted')
                // handle post state after deleting one
                updatePostState(currentUser._id)
            })
            .catch(() => {
                hide()
                cogoToast.error('Failed to delete post!')
            })
    }

    return (
        <ul className='list-group list-group-flush'>
            {data.user._id === currentUser._id && (
                <li className='list-group-item bg-light' style={listStyle}>
                    Edit post
                </li>
            )}
            <li className='list-group-item bg-light' style={listStyle}>
                Add to favorites
            </li>
            <li className='list-group-item bg-light' style={listStyle}>
                About this account
            </li>
            <li className='list-group-item bg-light' style={listStyle}>
                Unfollow
            </li>
            {data.user._id === currentUser._id && (
                <li
                    data-bs-dismiss='offcanvas'
                    className='list-group-item bg-light text-danger'
                    onClick={handleDelete}
                    style={listStyle}
                >
                    Delete post
                </li>
            )}
        </ul>
    )
}
