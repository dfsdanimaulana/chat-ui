/** React dependencies */
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import { useAuth } from '../../hooks/useAuth'
import { login as authLogin } from '../../services/auth.service'

import './Login.scss'
import LoginSVG from '../../assets/svg/Login.svg'

export default function SignIn() {
    const { login, getUser } = useAuth()
    const history = useHistory()
    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    // handle input user
    const handleChange = (e) => {
        const { id, value } = e.target
        setInput((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    // send and check data to server
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { hide } = cogoToast.loading('Loading...')
        try {
            const res = await authLogin(input.username, input.password)

            // set user state
            login(res)
            getUser(res._id)
            hide()
            history.push('/')
        } catch (err) {
            hide()
            cogoToast.error(err.message)
        }
    }

    // login as guest
    const setGuest = async () => {
        const { hide } = cogoToast.loading('Loading...')

        try {
            const res = await authLogin('guest', 'test123')

            // set user state
            login(res)
            getUser(res._id)
            hide()
            history.push('/')
        } catch (err) {
            hide()
            cogoToast.error(err.message)
        }
    }

    const google = () => {
        window.open('http://localhost:3003/v1/auth/google', '_self')
    }
    const facebook = () => {
        // require https domain in order to work
        window.open('http://localhost:3003/v1/auth/facebook', '_self')
    }
    const github = () => {
        window.open('http://localhost:3003/v1/auth/github', '_self')
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col h-100 d-none d-md-inline">
                    <img className="img-fluid" src={LoginSVG} alt="login page"></img>
                </div>
                <div className="col p-3 p-md-5">
                    <form className="p-4 mx-auto border p-3 rounded bg-white" onSubmit={handleSubmit}>
                        <h3 className="mb-4 text-center fw-bold">Login</h3>

                        <hr className="mb-3" />
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label fw-normal">
                                Email or Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Email or username"
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-normal">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <Link to="#" className="d-block mb-4 text-end small">
                            Forgot password?
                        </Link>
                        <div className="mb-3 d-flex flex-column align-items-center">
                            <button type="submit" className="btn btn-primary mb-3 px-5">
                                Login
                            </button>
                            <button onClick={setGuest} type="button" className="btn btn-outline-primary">
                                Login As Guest
                            </button>
                        </div>
                        <p className="line my-3">or</p>
                        <div className="d-flex justify-content-evenly my-3">
                            <button type="button" className="btn btn-outline-primary rounded-circle" onClick={google}>
                                <i className="bi bi-google"></i>
                            </button>
                            <button type="button" className="btn btn-outline-primary rounded-circle" onClick={facebook}>
                                <i className="bi bi-facebook"></i>
                            </button>
                            <button type="button" className="btn btn-outline-primary rounded-circle" onClick={github}>
                                <i className="bi bi-github"></i>
                            </button>
                        </div>
                        <p className="small text-center">
                            Don't have an account yet?
                            <Link to="/register"> Create account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
