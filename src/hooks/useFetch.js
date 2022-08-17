import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setisPending] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return
        axios
            .get(url)
            .then((res) => {
                setisPending(false)
                setData(res.data)
            })
            .catch((err) => {
                setisPending(false)
                setError(err)
            })
    },[url])

    return { data, isPending, error }
}

export default useFetch
