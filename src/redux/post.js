import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../api/axios'

export const fetchPost = createAsyncThunk('post/fetchPost', async (userId) => {
    try {
        const response = await axios.get('/post?sortBy=createdAt:desc&populate=user&userId=' + userId)
        return [...response.data]
    } catch (err) {
        return err.message
    }
})

const initialState = {
    value: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        updatePostStatus: (state, action) => {
            state.status = action.payload
        },
        resetPost: (state) => {
            state.value = []
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.value = action.payload
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getPostValue = (state) => state.post.value
export const getPostStatus = (state) => state.post.status
export const getPostError = (state) => state.post.error

export const { updatePostStatus, resetPost } = postSlice.actions

export default postSlice.reducer
