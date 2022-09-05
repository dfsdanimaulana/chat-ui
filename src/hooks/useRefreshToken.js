import { useDispatch } from 'react-redux'
import { login } from '../redux/user'
import { useSelector } from 'react-redux'
import axios from '../api/axios'

export const useRefreshToken = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.value)

    const refreshToken = async () => {
        try {
            const res = await axios.get('/auth/refresh', {
                withCredentials: true // allow send cookies with request
            })
            dispatch(
                login({
                    ...currentUser,
                    accessToken: res.data.accessToken
                })
            )

            return res.data.accessToken
        } catch (err) {
            return
        }
    }

    return refreshToken
}
