/** React dependencies */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'

/** Pages */
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Post from './pages/Post/Post'
import Profile from './pages/Profile/Profile'
import PostProfile from './pages/Profile/PostProfile'
import PageNotFound from './pages/404/PageNotFound'
import Setting from './pages/Setting/Setting'

/** Components */
import ProtectedRoute from './components/ProtectedRoute'
import Qrcode from './components/QRCode/Qrcode'
import Layout from './components/Layout'

const App = () => {
    return (
        <div className="bg-light min-vh-100">
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <ProtectedRoute exact path="/">
                        <Layout navbar>
                            <Home />
                        </Layout>
                    </ProtectedRoute>

                    <ProtectedRoute path="/profile/posts/:id">
                        <Layout nav title="Posts">
                            <PostProfile />
                        </Layout>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile">
                        <Layout navbar>
                            <Profile />
                        </Layout>
                    </ProtectedRoute>
                    <ProtectedRoute path="/post/create">
                        <Layout navbar>
                            <Post />
                        </Layout>
                    </ProtectedRoute>
                    <ProtectedRoute path="/setting">
                        <Layout nav title="Settings">
                            <Setting />
                        </Layout>
                    </ProtectedRoute>
                    <ProtectedRoute path="/qr/:id">
                        <Qrcode />
                    </ProtectedRoute>

                    <ProtectedRoute path="/:username">
                        <Layout navbar>
                            <Profile />
                        </Layout>
                    </ProtectedRoute>
                    <Route exact path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
