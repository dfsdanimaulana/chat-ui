import { useSelector, useDispatch } from 'react-redux'
import { getPostError, getPostValue, getPostStatus, fetchPost } from '../redux/post'

export function usePost() {
    const dispatch = useDispatch()

    const post = useSelector(getPostValue)
    const error = useSelector(getPostError)
    const status = useSelector(getPostStatus)

    const getPost = (id) => {
        dispatch(fetchPost(id))
    }

    return { post, error, status, getPost }
}
