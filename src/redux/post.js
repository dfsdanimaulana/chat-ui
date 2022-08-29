import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    // state name
    name: 'post',
    initialState: {
        value: [{}],
    },
    // function to change state value
    reducers: {
        updateUserPost: (state, action) => {
            state.value = action.payload
        },
        resetPost: (state) => {
            state.value = false
        },
    },
})

export const { updateUserPost, resetPost } = postSlice.actions

export default postSlice.reducer
