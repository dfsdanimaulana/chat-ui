/** React dependencies */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

/** Pages */
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Post from './pages/Post/Post'
import Profile from './pages/Profile/Profile'
import PostProfile from './pages/Profile/PostProfile'
import PageNotFound from './pages/404/PageNotFound'

/** Development Pages only */
// import UserList from './pages/UserList/UserList'

/** Components */
import Navbar from './components/Navbar/Navbar'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import Setting from './pages/Setting/Setting'

const App = () => {
    return (
        <div className='bg-light'>
            <Router>
                <Switch>
                    <ProtectedRoute exact path='/'>
                        <Navbar />
                        <Home />
                        <Navigation />
                        <Footer />
                    </ProtectedRoute>
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/register'>
                        <Register />
                    </Route>
                    <ProtectedRoute path='/profile/posts/:id'>
                        <PostProfile />
                        <Navigation />
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile'>
                        <Navbar />
                        <Profile />
                        <Navigation />
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute path='/post/create'>
                        <Navbar />
                        <Post />
                        <Navigation />
                    </ProtectedRoute>
                    <ProtectedRoute path='/setting'>
                        <Setting />
                        <Navigation />
                        <Footer />
                    </ProtectedRoute>
                    <Route exact path='*'>
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
