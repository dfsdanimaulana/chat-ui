import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../api/axios'

// handle side effect fetch an api outside reducers, because we can't do that inside reducer
// create an action creator
export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    try {
        const response = await axios.get('/comment')
        return [...response.data]
    } catch (err) {
        return err.message
    }
})

export const commentsSlice = createSlice({
    // state name
    name: 'comments',
    initialState: {
        value: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    // function to change state value
    reducers: {
        updateCommentStatus: async (state, action) => {
            state.status = action.payload
        },
        resetComments: (state) => {
            state.value = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.value = action.payload
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getCommentsValue = (state) => state.comments.value
export const getCommentsStatus = (state) => state.comments.status
export const getCommentsError = (state) => state.comments.error

export const { updateCommentStatus, resetComments } = commentsSlice.actions

export default commentsSlice.reducer
