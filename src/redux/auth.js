import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    // state name
    name: 'auth',
    initialState: {
        value: false
    },
    // function to change state value
    reducers: {
        loggedIn: (state) => {
            state.value = true
        },
        loggedOut: (state) => {
            state.value = false
        }
    }
})

export const { loggedIn, loggedOut } = authSlice.actions

export default authSlice.reducer
