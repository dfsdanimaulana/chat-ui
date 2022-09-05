/** React dependencies */
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import cogoToast from 'cogo-toast'

/** utils */
import axios from 'axios'

const Register = () => {
    const [input, setInput] = useState({
        username: '',
        birthday: '',
        gender: 'male',
        email: '',
        password: '',
        confirm_password: '',
    })

    const history = useHistory()

    const handleChange = (e) => {
        const { name, value } = e.target
        // handle radio button please...
        setInput((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { hide } = cogoToast.loading('Loading...')

        // Save data user to server
        axios
            .post(`/auth/register`, input)
            .then((res) => {
                hide()
                history.push('/login')
            })
            .catch((err) => {
                hide()
                if (err.response?.data !== undefined) {
                    const { hide } = cogoToast.error(
                        <ul className='list-group list-group-flush'>
                            {err.response.data.error.map((err, i) => (
                                <li key={i} className='list-group-item'>
                                    {err}
                                </li>
                            ))}
                        </ul>,
                        {
                            hideAfter: 5,
                            heading: 'Register error!',
                            onClick: () => hide(),
                        }
                    )
                } else {
                    const { hide } = cogoToast.error(
                        <div className='error-wrapper'>
                            <div className='alert alert-danger' role='alert'>
                                <ul>
                                    {['something went wrong', err.message].map(
                                        (err, i) => (
                                            <li key={i}>{err}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <hr />
                        </div>,
                        {
                            hideAfter: 5,
                            heading: 'Register error!',
                            onClick: () => hide(),
                        }
                    )
                }
            })
    }

    return (
        <div className='container'>
            <form className='m-2 m-lg-5 p-3 border' onSubmit={handleSubmit}>
                <h4 className='text-center'>Register form</h4>

                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='mb-3'>
                            <label htmlFor='username' className='form-label'>
                                Username
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                name='username'
                                autoComplete='off'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                Email address
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                name='email'
                                onChange={handleChange}
                                aria-describedby='emailHelp'
                                required
                            />
                            <div id='emailHelp' className='form-text'>
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='password'
                                        className='form-label'
                                    >
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='password'
                                        name='password'
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col'>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='confirm_password'
                                        className='form-label'
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='confirm_password'
                                        name='confirm_password'
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='mb-3'>
                            <label htmlFor='birthday' className='form-label'>
                                Birthday
                            </label>
                            <input
                                type='date'
                                className='form-control'
                                id='birthday'
                                name='birthday'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                Gender
                            </label>
                            <div className='row d-flex flex-column'>
                                <div className='col-4'>
                                    <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            type='radio'
                                            name='gender'
                                            id='exampleRadios1'
                                            defaultValue='male'
                                            onChange={handleChange}
                                            defaultChecked
                                        />
                                        <label
                                            className='form-check-label'
                                            htmlFor='exampleRadios1'
                                        >
                                            Male
                                        </label>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='form-check'>
                                        <input
                                            className='form-check-input'
                                            type='radio'
                                            name='gender'
                                            onChange={handleChange}
                                            value='female'
                                            id='exampleRadios2'
                                        />
                                        <label
                                            className='form-check-label'
                                            htmlFor='exampleRadios2'
                                        >
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <button type='submit' className='btn btn-primary w-50 mb-3'>
                        Submit
                    </button>
                    <p>
                        Have an account? <Link to='/login'>Log in</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register
