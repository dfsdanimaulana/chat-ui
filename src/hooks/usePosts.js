import { useSelector, useDispatch } from 'react-redux'
import { getPostsError, getPostsValue, getPostsStatus, fetchPosts, updatePostsStatus } from '../redux/posts'

export function usePosts() {
    const dispatch = useDispatch()
    const posts = useSelector(getPostsValue)
    const error = useSelector(getPostsError)
    const status = useSelector(getPostsStatus)

    const getPosts = () => {
        dispatch(fetchPosts())
    }

    const setStatusPosts = (status) => {
        dispatch(updatePostsStatus(status))
    }

    return { posts, error, status, getPosts, setStatusPosts }
}
