import React from 'react'
import ReactDOM from 'react-dom'

/** Components */
import App from './App.js'

/** Redux */
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/user'
import authReducer from './redux/auth'
import postReducer from './redux/post'
import postsReducer from './redux/posts'
import commentsReducer from './redux/comments'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        post: postReducer,
        posts: postsReducer,
        comments: commentsReducer,
    },
    
})

// The thunk middleware was automatically added

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
