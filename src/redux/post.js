import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import BASE_URL from '../config'

export const postSlice = createSlice({
    // state name
    name: 'post',
    initialState: {
        value: null,
    },
    // function to change state value
    reducers: {
      /*
        getPosts: (state) => {
                    axios
                    .get(`${BASE_URL}/post`)
                    .then((res) => {
                        state.value = res.data
                    })
                    .catch((err) => {
                        state.value = null
                    })
            
        },
        */
        getPosts: async (state) => {
          try {
            const res = await axios.get(`${BASE_URL}/post`)
            state.value = res.data
          } catch (err) {
            state.value = null
          }
        },
        updatePost: (state) => {
            state.value = false
        },
    },
})

export const { getPosts, updatePost } = postSlice.actions

export default postSlice.reducer
