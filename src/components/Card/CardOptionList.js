import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import cogoToast from 'cogo-toast'

export default function CardOptionList({ data, currentUser }) {
    const axiosPrivate = useAxiosPrivate()

    const handleDelete = () => {
        const { hide } = cogoToast.loading('Deleting post...')

        axiosPrivate
            .delete('/post/' + data._id)
            .then(() => {
                hide()
                cogoToast.success('Post deleted')
            })
            .catch(() => {
                hide()
                cogoToast.error('Failed to delete post!')
            })

        // handle post state after deleting one
        // delete image in cloudinary server side
    }

    return (
        <ul className='list-group list-group-flush'>
            {data.user._id === currentUser._id && (
                <li className='list-group-item bg-light'>Edit post</li>
            )}
            <li className='list-group-item bg-light'>Add to favorites</li>
            <li className='list-group-item bg-light'>About this account</li>
            <li className='list-group-item bg-light'>Unfollow</li>
            {data.user._id === currentUser._id && (
                <li
                    className='list-group-item bg-light text-danger'
                    onClick={handleDelete}>
                    Delete post
                </li>
            )}
        </ul>
    )
}
