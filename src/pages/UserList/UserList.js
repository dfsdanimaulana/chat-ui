import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileCard from '../../components/Profile/ProfileCard'
import axios from 'axios'

const UserList = () => {
    const [users, setUsers] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        axios
            .get(`/user`)
            .then((res) => {
                setIsPending(false)
                setError(false)
                setUsers(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                setIsPending(false)
                setError(true)
            })
    },[])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col text-center'>
                    <Link to='/' className='btn btn-primary m-3 d-block'>
                        Home
                    </Link>
                </div>
                <div className='col text-center'>
                    <Link
                        to='/register'
                        className='btn btn-primary m-3 d-block'>
                        Register
                    </Link>
                </div>
            </div>
            <div className='row'>
                {isPending ? (
                    <div className='d-flex justify-content-center'>
                        <div className='spinner-border' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                    </div>
                ) : !error ? (
                    users.map((user) => (
                        <div
                            className='col-md-6 col-lg-4 col-xl-3'
                            key={user._id}>
                            <ProfileCard user={user} />
                        </div>
                    ))
                ) : (
                    <div className='m-3'>No User</div>
                )}
            </div>
        </div>
    )
}

export default UserList
