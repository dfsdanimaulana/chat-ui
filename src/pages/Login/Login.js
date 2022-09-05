/** React dependencies */
import { useState } from 'react'
import axios from '../../api/axios'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/user'
import { loggedIn } from '../../redux/auth'
import cogoToast from 'cogo-toast'
import LoginSVG from '../../assets/svg/Login.svg'

/** Styles */
import './Login.css'

export default function SignIn() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState({
        username: '',
        password: '',
    })

    // handle input user
    const handleChange = (e) => {
        const { id, value } = e.target
        setInput((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }

    // send and check data to server
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { hide } = cogoToast.loading('Loading...')
        try {
            const user = await axios.post(`/auth/login`, input)
            hide()
            dispatch(login(user.data))
            dispatch(loggedIn())
            history.push('/')
        } catch (err) {
            hide()
            if (err.response?.data !== undefined) {
                cogoToast.error(err.response.data.error)
            } else {
                cogoToast.error('connection error')
            }
        }
    }

    // login as guest
    const setGuest = async () => {
        const { hide } = cogoToast.loading('Loading...')

        try {
            const user = await axios.post(`/auth/login`, {
                username: 'guest',
                password: '123456',
            })

            hide()

            dispatch(login(user.data))
            dispatch(loggedIn())
            history.push('/')
        } catch (err) {
            hide()
            if (err.response?.data !== undefined) {
                cogoToast.error(err.response.data.error)
            } else {
                cogoToast.error('connection error')
            }
        }
    }

    return (
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col h-100 d-none d-md-inline'>
                    <img
                        className='img-fluid image'
                        src={LoginSVG}
                        alt='login page'
                    ></img>
                </div>
                <div className='col p-5'>
                    <form
                        className='p-4 mx-auto border p-3'
                        onSubmit={handleSubmit}
                    >
                        <h3 className='mb-4 text-center fw-bold'>Login</h3>

                        <hr className='mb-3' />
                        <div className='mb-3'>
                            <label
                                htmlFor='username'
                                className='form-label fw-normal'
                            >
                                Email or Username
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                placeholder='Email or username'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor='password'
                                className='form-label fw-normal'
                            >
                                Password
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='Enter your password'
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <Link to='#' className='d-block mb-4 text-end small'>
                            Forgot password?
                        </Link>
                        <div className='mb-3 d-flex flex-column align-items-center'>
                            <button
                                type='submit'
                                className='btn btn-primary mb-3 px-5'
                            >
                                Login
                            </button>
                            <button
                                onClick={setGuest}
                                type='button'
                                className='btn btn-outline-primary'
                            >
                                Login As Guest
                            </button>
                        </div>
                        <p className='line my-3'>or</p>
                        <div className='d-flex justify-content-evenly my-3'>
                            <button
                                type='button'
                                className='btn btn-outline-primary rounded-circle'
                            >
                                <i className='bi bi-google'></i>
                            </button>
                            <button
                                type='button'
                                className='btn btn-outline-primary rounded-circle'
                            >
                                <i className='bi bi-facebook'></i>
                            </button>
                            <button
                                type='button'
                                className='btn btn-outline-primary rounded-circle'
                            >
                                <i className='bi bi-twitter'></i>
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
