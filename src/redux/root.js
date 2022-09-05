import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './user'
import authReducer from './auth'
import postReducer from './post'
import postsReducer from './posts'
import commentsReducer from './comments'

const appReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    post: postReducer,
    posts: postsReducer,
    comment: commentsReducer
})

const rootReducer = (state, action) => {

    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action)
    }
    
    return appReducer(state, action)
}

export default rootReducer


