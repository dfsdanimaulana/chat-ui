/** React dependencies */
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

/** Utils */
// import axios from 'axios'

/** Pages */
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Post from './pages/Post/Post'
import Profile from './pages/Profile/Profile'
import PageNotFound from './pages/404/PageNotFound'

/** Development Pages only */
// import UserList from './pages/UserList/UserList'

/** Components */
import Navbar from './components/Navbar/Navbar'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import ProtectedRoute from './components/ProtectedRoute'
// import Sidebar from './components/Sidebar/Sidebar'
// import ChatBody from './components/Chat/ChatBody'
// import ProfileCard from './components/Profile/ProfileCard'
// import AddPost from './components/Post/AddPost'
// import UserPost from './components/Post/UserPost'
// import AboutMeCard from './components/Profile/AboutMeCard'

const App = () => {
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = 'http://localhost:3003'
    const currentUser = useSelector((state) => state.user.value)

    return (
        <div>
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
