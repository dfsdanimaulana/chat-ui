import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/root'

const store = configureStore({
    reducer: rootReducer
})

export default store
