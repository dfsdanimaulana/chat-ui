// eslint-disable
import { useEffect, useState } from 'react'
import { useAxiosPrivate } from './useAxiosPrivate'

export function useUser(username) {
    const [user, setUser] = useState(null)
    const [post, setPost] = useState([])
    const [savedPost, setSavedPost] = useState([])
    const [followers, setFollowers] = useState([])
    const [follow, setFollow] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getPost = async (userId) => {
            setIsPending(true)
            try {
                const res = await axiosPrivate.get(`/post?userId=${userId}&populate=user`)
                setPost(res.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsPending(false)
            }
        }

        const getUser = async () => {
            setIsPending(true)
            try {
                const res = await axiosPrivate.get(`/user?username=${username}`)
                setUser(res.data[0])
                getPost(res.data[0]._id)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsPending(false)
            }
        }

        getUser()
    }, [username])

    return { user, post, savedPost, follow, followers, isPending, error, setSavedPost, setFollow, setFollowers }
}
