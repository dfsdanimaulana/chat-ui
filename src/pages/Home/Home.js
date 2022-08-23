/** React dependencies */
// import { Fragment, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom'

import Card from "../../components/Card/Card"

/** Components */
// import Footer from '../../components/Footer/Footer'
// import Navbar from '../../components/Navbar/Navbar'
// import Post from '../../components/Post/Post'
// import ProfileCard from '../../components/Profile/ProfileCard'
// import Sidebar from '../../components/Sidebar/Sidebar'

/** Utils */
// import BASE_URL from '../../config'
// import useFetch from '../../hooks/useFetch'

const Home = (props) => {
    // // get auth state
    // const isLoggedIn = useSelector((state) => state.auth.value)
    // const posts = useSelector((state) => state.post.value)

    // // get logged user state
    // const currentUser = useSelector((state) => state.user.value)
    // const [arrays, setArrays] = useState([1, 2, 2, 3, 3, 3, 3, 3, 3])

    // const { data: post, isPending, error } = useFetch(`${BASE_URL}/post`)

    // if (!isLoggedIn && !posts) {
    //     return (
    //         <Redirect
    //             to={{
    //                 pathname: '/login',
    //                 state: { from: props.location },
    //             }}
    //         />
    //     )
    // }
    return (
        <div className='container'>
            <div className='row px-lg-5'>
                <div className='col'>
                  <Card id='one'/>
                  <Card id='two'/>
                </div>
                {/* <div className='col'></div> */}
            </div>
        </div>
        // <Fragment>
        //     <Navbar />
        //     <Sidebar />
        //     <div className='content-wrapper'>
        //         <div className='container'>
        //             <div className='row p-3'>
        //                 <div className='border rounded shadow-sm story-card-container d-flex overflow-auto'>
        //                     {arrays.map((v, i) => (
        //                         <div className='m-3' key={i}>
        //                             <img
        //                                 className='story-image rounded'
        //                                 src={currentUser.img_thumb}
        //                                 alt='profile'
        //                             />
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //             <div className='row m-3'>
        //                 <div className='col-lg-8 pb-5'>
        //                     <div className='d-flex flex-column-reverse'>
        //                         {post &&
        //                             post.map((pst) => (
        //                                 <Post key={pst._id} post={pst} />
        //                             ))}
        //                     </div>
        //                 </div>
        //                 <div className='col-lg-4 d-none d-md-block'>
        //                     <ProfileCard user={currentUser} />
        //                 </div>
        //             </div>
        //         </div>
        //         <Footer />
        //     </div>
        // </Fragment>
    )
}

export default Home
