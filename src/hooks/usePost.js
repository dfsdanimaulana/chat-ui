import { useSelector, useDispatch } from 'react-redux'
import { getPostError, getPostValue, getPostStatus, fetchPost, updatePostStatus, resetPost } from '../redux/post'

export function usePost() {
    const dispatch = useDispatch()

    const post = useSelector(getPostValue)
    const error = useSelector(getPostError)
    const status = useSelector(getPostStatus)

    const getPost = (id) => {
        dispatch(fetchPost(id))
    }

    const setStatusPost = (status) => {
        dispatch(updatePostStatus(status))
    }
    
    const reset = () => {
        dispatch(resetPost())
    }
    
    return { post, error, status, getPost, setStatusPost, reset}
}
