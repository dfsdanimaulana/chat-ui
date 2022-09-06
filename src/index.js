import React from 'react'
import ReactDOM from 'react-dom'

/** Components */
import App from './App.js'

/** Redux */
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
