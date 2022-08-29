/** React dependencies */
import { useFetch } from '../../hooks/useFetch'
import Card from '../../components/Card/Card'
import CardPlaceholder from '../../components/Card/CardPlaceholder'

const Home = () => {
    const { data: posts, isPending } = useFetch(`/post`) // @typeof post Array

    return (
        <div className='container mt-3'>
            <div className='row px-lg-5 pb-5 pb-md-0'>
                <div className='col'>
                    {isPending && (
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
                </div>
            </div>
        </div>
    )
}

export default Home
