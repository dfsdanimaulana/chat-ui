import { FormInput } from './EditProfile'
import { useState } from 'react'
import Avatar from '../../components/Avatar/Avatar'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import cogoToast from 'cogo-toast'

export default function ChangePassword({ currentUser }) {
    const axiosPrivate = useAxiosPrivate()
    const [data, setData] = useState({
        _id: currentUser._id,
        password_old: '',
        password_new: '',
        password_new_confirm: ''
    })

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { hide } = cogoToast.loading('Updating...')
        if (data.password_old === data.password_new) {
            hide()
            cogoToast.error('old password and new password is same!')

            return
        }

        if (data.password_new_confirm !== data.password_new) {
            hide()
            cogoToast.error('wrong confirm password!')

            return
        }

        axiosPrivate
            .post(`/auth/change_password`, data)
            .then((user) => {
                hide()
                cogoToast.success('Update successfully!')
            })
            .catch((err) => {
                hide()
                // handle invalid token error please
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
                            onClick: () => hide()
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
                            onClick: () => hide()
                        }
                    )
                }
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='row align-items-center my-3'>
                <div className='col-3 text-end pe-3'>
                    <Avatar width={42} thumbnail='false' />
                </div>
                <div className='col-9 pe-5'>
                    <div className='fw-semibold fs-5'>
                        {currentUser.username}
                    </div>
                </div>
            </div>
            <FormInput
                type='password'
                handleChange={handleInputChange}
                label='Old Password'
                id='password_old'
                value={data.password_old}
            />
            <FormInput
                type='password'
                handleChange={handleInputChange}
                label='New Password'
                id='password_new'
                value={data.password_new}
            />
            <FormInput
                type='password'
                handleChange={handleInputChange}
                label='Confirm New Password'
                id='password_new_confirm'
                value={data.password_new_confirm}
            />
            <div className='row align-items-center my-3'>
                <div className='col-3 text-end pe-3'></div>
                <div className='col-9 pe-5 text-end'>
                    <button className='btn btn-outline-primary'>Update</button>
                </div>
            </div>
        </form>
    )
}
