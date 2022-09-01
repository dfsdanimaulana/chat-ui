import { useDispatch } from 'react-redux'
import { fetchPost } from '../redux/post'
import { fetchPosts } from '../redux/posts'

export const useUpdatePost = () => {
    const dispatch = useDispatch()

    const updatePostState = (userId) => {
        dispatch(fetchPost(userId))
        dispatch(fetchPosts())
    }

    return updatePostState
}
