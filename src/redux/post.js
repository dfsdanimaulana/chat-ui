import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const postSlice = createSlice({
    // state name
    name: 'post',
    initialState: {
        value: [{}],
    },
    // function to change state value
    reducers: {
        getPosts: async (state) => {
            try {
                const res = await axios.get(`/post`)
                state.value = res.data
            } catch (err) {
                state.value = null
            }
        },
        updateUserPost: (state, action) => {
            state.value = action.payload
        },
        updatePost: (state) => {
            state.value = false
        },
    },
})

export const { updateUserPost, updatePost } = postSlice.actions

export default postSlice.reducer
