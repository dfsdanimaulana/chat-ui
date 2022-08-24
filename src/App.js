/** React dependencies */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

/** Utils */
// import axios from 'axios'

/** Pages */
import Home from './pages/Home/Home'
// import PageNotFound from './pages/404/PageNotFound'
// import Login from './pages/Login/Login'
// import Register from './pages/Register/Register'

/** Development Pages only */
// import UserList from './pages/UserList/UserList'

/** Components */
import Navbar from './components/Navbar/Navbar'
import Profile from './pages/Profile/Profile'
// import Sidebar from './components/Sidebar/Sidebar'
// import ChatBody from './components/Chat/ChatBody'
// import Footer from './components/Footer/Footer'
// import ProfileCard from './components/Profile/ProfileCard'
// import AddPost from './components/Post/AddPost'
// import UserPost from './components/Post/UserPost'
// import AboutMeCard from './components/Profile/AboutMeCard'

const App = () => {
    // axios.defaults.withCredentials = true
    // const currentUser = useSelector((state) => state.user.value)

    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/profile' component={Profile} />
                    {/* <Route path='/register' component={Register} />

                    <Route path='/login' exact component={Login} />

                    <Route path='/user-list' component={UserList} />

                    <Route exact path='/' component={Home} />

                    <Route path='/chats' component={ChatBody} />

                    <Route path='/add-post'>
                        <NavbarLte />
                        <SidebarLte />
                        <div className='content-wrapper'>
                            <AddPost />
                            <Footer />
                        </div>
                    </Route>

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

                    <Route path='*' component={PageNotFound} /> */}
                </Switch>
            </Router>
        </div>
    )
}

export default App
