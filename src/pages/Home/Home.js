import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchPosts,
    getPostsValue,
    getPostsStatus,
    getPostsError,
} from '../../redux/posts'
import { fetchComments } from '../../redux/comments'

// components
import Card from '../../components/Card/Card'
import CardPlaceholder from '../../components/Card/CardPlaceholder'

const Home = () => {
    const dispatch = useDispatch()

    const posts = useSelector(getPostsValue)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
            dispatch(fetchComments())
        }
    }, [postsStatus, dispatch])

    return (
        <div className='container mt-3'>
            <div className='row px-lg-5 pb-5 pb-md-0'>
                <div className='col'>
                    {postsStatus === 'loading' && (
                        <>
                            <CardPlaceholder />
                            <CardPlaceholder />
                        </>
                    )}
                    {posts &&
                        posts.map((post) => (
                            <Card
                                key={post._id}
                                id={post.uniqueId}
                                post={post}
                            />
                        ))}
                    {error && <h1>Filed to fetch data</h1>}
                </div>
            </div>
        </div>
    )
}

export default Home
