import { useDispatch } from 'react-redux'
import { fetchPost } from '../redux/post'
import { fetchPosts } from '../redux/posts'
import { fetchUser } from '../redux/user'

export const useUpdatePost = () => {
    const dispatch = useDispatch()

    const updatePostState = (userId) => {
        dispatch(fetchPost(userId))
        dispatch(fetchUser(userId))
        dispatch(fetchPosts())
    }

    return updatePostState
}
