import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../api/axios'

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
        value: null
    },
    // function to change state value
    reducers: {
        userLogin: (state, action) => {
            state.value = {
                ...state.value,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        },
        userLogout: (state) => {
            state.value = null
        },
        updateUser: (state, action) => {
            state.value = { ...state.value, ...action.payload }
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

export const { userLogin, userLogout, updateUser } = userSlice.actions

export default userSlice.reducer
