/** React dependencies */
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

/** global state */
import { login } from '../../redux/user'
import { loggedIn } from '../../redux/auth'
import { getPosts } from '../../redux/post'

/** utils */
import axios from 'axios'
import BASE_URL from '../../config'

/** Styles */
import './Login.css'

export default function SignIn() {
    const [input, setInput] = useState({
        username: '',
        password: '',
    })

    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    // cek if user already login
    useEffect(() => {
        axios
            .get(`${BASE_URL}/user/login`)
            .then((user) => {
                console.log(user)
            })
            .catch((err) => {
                console.log(err.data)
            })
    }, [])

    // handle input user
    const handleChange = (e) => {
        const { id, value } = e.target
        setInput((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }

    // send and check data to server
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`${BASE_URL}/user/login`, input)
            .then((user) => {
                // data valid
                setError('')
                dispatch(login(user.data))
                dispatch(loggedIn())
                dispatch(getPosts())
                history.push('/')
            })
            .catch((err) => {
                if (err.response?.data !== undefined) {
                    setError(err.response.data.error)
                } else {
                    setError('connection error')
                }
            })
    }

    // login as guest
    const setGuest = () => {
        axios
            .post(`${BASE_URL}/user/login`, {
                username: 'guest',
                password: '123456',
            })
            .then((user) => {
                setError('')
                dispatch(login(user.data))
                dispatch(loggedIn())
                dispatch(getPosts())
                history.push('/')
            })
            .catch((err) => {
                if (err.response?.data !== undefined) {
                    setError(err.response.data.error)
                } else {
                    setError('connection error')
                }
            })
    }

    return (
        <div className='container bg-light '>
            <div className='row vh-100 min-h align-items-center'>
                <div className='col h-100 d-none d-md-inline'>
                    <img
                        className='img-fluid image'
                        src='https://source.unsplash.com/m2Wd_bTUSGw/640x958'
                        alt='login page'></img>
                </div>
                <div className='col'>
                    <form
                        className='w-75 p-4 mx-auto shadow rounded'
                        onSubmit={handleSubmit}>
                        <h3 className='mb-4 text-center'>Login to Dstopia!</h3>
                        {error !== '' && (
                            <div className='alert alert-danger' role='alert'>
                                {error}
                            </div>
                        )}
                        <hr className='mb-3' />
                        <div className='mb-3'>
                            <label
                                htmlFor='username'
                                className='form-label fw-normal'>
                                Email or Username
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                placeholder='Email or username'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-1'>
                            <label
                                htmlFor='password'
                                className='form-label fw-normal'>
                                Password
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='Enter your email'
                                onChange={handleChange}
                            />
                        </div>
                        <Link to='#' className=' d-block mb-4 text-end small'>
                            Forgot password?
                        </Link>
                        <button
                            type='submit'
                            className='btn btn-outline-primary btn-block'>
                            Login
                        </button>
                        <button
                            onClick={setGuest}
                            className='btn btn-outline-primary btn-block'>
                            Login As Guest
                        </button>
                        <p className='line my-3'>or</p>
                        <div className='d-flex justify-content-evenly my-3'>
                            <button
                                type='button'
                                className='btn btn-outline-primary rounded-circle'>
                                <i className='fab fa-twitter'></i>
                            </button>
                            <button
                                type='button'
                                className='btn btn-outline-primary rounded-circle'>
                                <i className='fab fa-facebook'></i>
                            </button>
                            <button
                                type='button'
                                className='btn btn-outline-primary rounded-circle'>
                                <i className='fab fa-google'></i>
                            </button>
                        </div>
                        <p className='small text-center'>
                            Don't have an account yet?
                            <Link to='/register'> Create account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
