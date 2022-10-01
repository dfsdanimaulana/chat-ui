import { useEffect } from 'react'
import { usePosts } from '../../hooks/usePosts'
import { useComments } from '../../hooks/useComments'

// components
import Card from '../../components/Card/Card'
import CardPlaceholder from '../../components/Card/CardPlaceholder'

const Home = () => {
    const { posts, status, error, getPosts } = usePosts()
    const { getComments } = useComments()

    useEffect(() => {
        getPosts()
        getComments()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container mt-3">
            <div className="row px-lg-5 pb-5 pb-md-0">
                <div className="col">
                    {posts && posts.map((post) => <Card key={post._id} id={post.uniqueId} post={post} />)}
                    {error && <h1>Failed to fetch data</h1>}
                    {status === 'loading' && posts.length === 0 && (
                        <>
                            <CardPlaceholder />
                            <CardPlaceholder />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
