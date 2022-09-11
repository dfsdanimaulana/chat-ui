import Card from '../../components/Card/Card'
import Nav from '../../components/Navbar/Nav'
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

export default function PostProfile() {
    const { width } = useWindowDimensions()
    const posts = useSelector((state) => state.post.value)
    const { id } = useParams()

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
            {width < 768 ? <Nav title="Posts" /> : <Navbar />}
            {posts && (
                <div className="container mt-3">
                    <div className="row px-lg-5 pb-5 pb-md-0">
                        <div className="col">
                            {posts && posts.map((post) => <Card key={post._id} id={post.uniqueId} post={post} />)}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
