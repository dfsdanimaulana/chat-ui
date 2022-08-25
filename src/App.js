/** React dependencies */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
// import Sidebar from './components/Sidebar/Sidebar'
// import ChatBody from './components/Chat/ChatBody'
// import Footer from './components/Footer/Footer'
// import ProfileCard from './components/Profile/ProfileCard'
// import AddPost from './components/Post/AddPost'
// import UserPost from './components/Post/UserPost'
// import AboutMeCard from './components/Profile/AboutMeCard'

const App = () => {
    // axios.defaults.withCredentials = true
    const currentUser = useSelector((state) => state.user.value)

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/'>
                      <Navbar />
                      <Home />
                      <Navigation/>
                      <Footer />
                    </Route>
                    <Route exact path='/login'>
                      <Login />
                    </Route>
                    <Route exact path='/register'>
                      <Register />
                    </Route>
                    <Route path='/profile'>
                      <Navbar />
                      <Profile />
                      <Navigation/>
                      <Footer />
                    </Route>
                    <Route path='/post/create'>
                      <Navbar />
                      <Post />
                      <Navigation/>
                      <Footer />
                    </Route>
                    <Route exact path='*'>
                      <PageNotFound />
                    </Route>
                </Switch>


                {/* 
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

                    */}
            </Router>
        </div>
    )
}

export default App
