import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    _id: '',
    username: '',
    name: '',
    img_thumb: '',
    img_bg: '',
    email: '',
    desc: '',
    gender: '',
    followers: [],
    following: [],
    post: [],
    accessToken: '',
}

export const userSlice = createSlice({
    // state name
    name: 'user',
    initialState: {
        value: initialStateValue,
    },
    // function to change state value
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => [(state.value = initialStateValue)],
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
