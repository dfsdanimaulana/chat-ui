import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'

/** Components */
import App from './App.js'

/** Redux */
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/user'
import authReducer from './redux/auth'
import postReducer from './redux/post'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        post: postReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
