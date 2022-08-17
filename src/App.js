/** React dependencies */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

/** Utils */
import axios from 'axios'

/** Pages */
import Home from './pages/Home/Home'
import PageNotFound from './pages/404/PageNotFound'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

/** Development Pages only */
import UserList from './pages/UserList/UserList'

/** Components */
import NavbarLte from './components/Navbar/NavbarLte'
import SidebarLte from './components/Sidebar/SidebarLte'
import ChatBody from './components/Chat/ChatBody'
import Footer from './components/Footer/Footer'
import ProfileCard from './components/Profile/ProfileCard'
import AddPost from './components/Post/AddPost'
import UserPost from './components/Post/UserPost'
import AboutMeCard from './components/Profile/AboutMeCard'

const App = () => {
    axios.defaults.withCredentials = true
    const currentUser = useSelector((state) => state.user.value)

    return (
        <div className='wrapper'>
            <Router>
                <Switch>
                    {/* Register Page */}
                    <Route path='/register' component={Register} />

                    {/* Login Page */}
                    <Route path='/login' exact component={Login} />

                    {/* User List Page */}
                    <Route path='/user-list' component={UserList} />

                    {/* Home Page */}
                    <Route exact path='/' component={Home} />

                    {/* Chats Page */}
                    <Route path='/chats' component={ChatBody} />

                    {/* Add Post Page */}
                    <Route path='/add-post'>
                        <NavbarLte />
                        <SidebarLte />
                        <div className='content-wrapper'>
                            <AddPost />
                            <Footer />
                        </div>
                    </Route>

                    {/* User Page */}
                    <Route path='/user'>
                        <NavbarLte />
                        <SidebarLte />
                        <div className='content-wrapper'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <ProfileCard user={currentUser} />
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <AboutMeCard user={currentUser} />
                                    </div>
                                </div>
                                <UserPost posts={currentUser.post} />
                            </div>
                            <Footer />
                        </div>
                    </Route>

                    {/* Page not found */}
                    <Route path='*' component={PageNotFound} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
