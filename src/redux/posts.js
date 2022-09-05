import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../api/axios'

// handle side effect fetch an api outside reducers, because we can't do that inside reducer
// create an action creator
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get('/post')
        return [...response.data]
    } catch (err) {
        return err.message
    }
})

export const postsSlice = createSlice({
    // state name
    name: 'posts',
    initialState: {
        value: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    // function to change state value
    reducers: {
        updatePostsStatus: async (state, action) => {
            state.status = action.payload
        },
        resetPosts: (state) => {
            state.value = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.value = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getPostsValue = (state) => state.posts.value
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const { updatePostsStatus, resetPosts } = postsSlice.actions

export default postsSlice.reducer
