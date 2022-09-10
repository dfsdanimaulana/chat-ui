import axios from 'axios'

export const register = (data) => {
    return axios.post('/auth/register', data)
}

export const login = async (username, password) => {
    const response = await axios.post('/auth/login', {
        username,
        password
    })
    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

export const logout = () => {
    return localStorage.clear('user')
}
