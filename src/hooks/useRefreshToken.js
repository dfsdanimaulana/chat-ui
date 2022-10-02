import axios from '../api/axios'
import { useAuth } from './useAuth'

export const useRefreshToken = () => {
    const { user, login } = useAuth()

    const refreshToken = async () => {
        try {
            const res = await axios.get('/auth/refresh', {
                withCredentials: true // allow send cookies with request
            })

            const newUserData = {
                ...user,
                accessToken: res.data.accessToken
            }

            login(newUserData)
            return res.data.accessToken
        } catch (err) {
            return
        }
    }

    return refreshToken
}
