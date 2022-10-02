import axios from 'axios'

export const register = async (data) => {
    return axios.post('/auth/register', data)
}

export const login = async (username, password) => {
    const response = await axios.post('/auth/login', {
        username,
        password
    })
    if (response.data.accessToken) {
        localStorage.setItem(
            'user',
            JSON.stringify({
                accessToken: response.data.accessToken,
                _id: response.data._id
            })
        )
    }
    return response.data
}

export const logout = () => {
    localStorage.clear('user')
}
