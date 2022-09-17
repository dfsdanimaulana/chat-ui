import axios from '../api/axios'
import { useUser } from './useUser'

export const useRefreshToken = () => {
    const { user, login } = useUser

    const refreshToken = async () => {
        try {
            const res = await axios.get('/auth/refresh', {
                withCredentials: true // allow send cookies with request
            })
            login({
                ...user,
                accessToken: res.data.accessToken
            })
            return res.data.accessToken
        } catch (err) {
            return
        }
    }

    return refreshToken
}
