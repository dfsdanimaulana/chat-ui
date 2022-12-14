import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { usePost } from '../../hooks/usePost'
import Card from '../../components/Card/Card'

export default function PostProfile() {
    const { id } = useParams()
    const { post } = usePost()

    useEffect(() => {
        const element = document.getElementById(id)
        const headerOffset = 70
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    }, [id])

    return (
        <>
            {post && (
                <div className="container mt-3">
                    <div className="row px-lg-5 pb-5 pb-md-0">
                        <div className="col">
                            {post && post.map((post) => <Card key={post._id} id={post.uniqueId} post={post} />)}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
