import { useSelector, useDispatch } from 'react-redux'
import { getUserError, getUserValue, getUserStatus, fetchUser, userLogin, userLogout, updateUser } from '../redux/user'

export function useUser() {
    const dispatch = useDispatch()

    const user = useSelector(getUserValue)
    const error = useSelector(getUserError)
    const status = useSelector(getUserStatus)

    const getUser = (id) => {
        dispatch(fetchUser(id))
    }

    const login = (payload) => {
        dispatch(userLogin(payload))
    }

    const logout = () => {
        dispatch(userLogout())
    }

    const update = (payload) => {
        dispatch(updateUser(payload))
    }
    return { user, error, status, getUser, login, logout, update }
}
