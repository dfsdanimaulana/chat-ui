/** React dependencies */
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { generateRandomId } from '../../helpers/generateRandomId'

import Card from '../../components/Card/Card'

/** Utils */
import { useFetch } from '../../hooks/useFetch'

const Home = (props) => {
    // get auth state
    const isLoggedIn = useSelector((state) => state.auth.value) // @typeof isLoggedIn Boolean
    const { data: posts } = useFetch(`/post`) // @typeof post Array

    if (!isLoggedIn && !posts) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location },
                }}
            />
        )
    }

    return (
        <div className='container'>
            <div className='row px-lg-5 pb-5 pb-md-0'>
                <div className='col'>
                    {posts &&
                        posts.map((post) => (
                            <Card
                                key={post._id}
                                id={generateRandomId()}
                                post={post}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Home
