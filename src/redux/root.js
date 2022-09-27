import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './user'
import postReducer from './post'
import postsReducer from './posts'
import commentsReducer from './comments'

const combinedReducers = combineReducers({
    user: userReducer,
    post: postReducer,
    posts: postsReducer,
    comments: commentsReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        return combinedReducers(undefined, action)
    }

    return combinedReducers(state, action)
}

export default rootReducer
