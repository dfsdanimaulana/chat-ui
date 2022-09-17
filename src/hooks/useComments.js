import { useSelector, useDispatch } from 'react-redux'
import { getCommentsError, getCommentsValue, getCommentsStatus, fetchComments } from '../redux/comments'

export function useComments() {
    const dispatch = useDispatch()

    const comments = useSelector(getCommentsValue)
    const error = useSelector(getCommentsError)
    const status = useSelector(getCommentsStatus)

    const getComments = () => {
        dispatch(fetchComments())
    }

    return { comments, error, status, getComments }
}
