import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../api/axios'

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
    savedPost: [],
    accessToken: ''
}

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
    try {
        const response = await axios.get('/user/' + userId + '?populate=post,savedPost')
        return response.data
    } catch (err) {
        return err.message
    }
})

export const userSlice = createSlice({
    // state name
    name: 'user',
    initialState: {
        value: initialStateValue
    },
    // function to change state value
    reducers: {
        userLogin: (state, action) => {
            state.value = action.payload
        },
        userLogout: (state) => {
            state.value = initialStateValue
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.value = {
                    ...action.payload,
                    accessToken: state.value.accessToken
                }
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getUserValue = (state) => state.user.value
export const getUserStatus = (state) => state.user.status
export const getUserError = (state) => state.user.error

export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer
