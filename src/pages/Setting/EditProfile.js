import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/user'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import cogoToast from 'cogo-toast'

export default function EditProfile({ currentUser }) {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const [data, setData] = useState({
        _id: currentUser._id,
        username: currentUser.username,
        name: currentUser.name,
        email: currentUser.email,
        desc: currentUser.desc,
        gender: currentUser.gender
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

        // check if there's any update
        if (
            data._id === currentUser._id &&
            data.username === currentUser.username &&
            data.name === currentUser.name &&
            data.email === currentUser.email &&
            data.desc === currentUser.desc &&
            data.gender === currentUser.gender
        ) {
            hide()
            cogoToast.info('Nothing to update!')
            return
        }
        axiosPrivate
            .put(`/user/update`, data)
            .then((user) => {
                const updatedUser = {
                    ...currentUser,
                    username: user.data.username,
                    name: user.data.name,
                    email: user.data.email,
                    desc: user.data.desc,
                    gender: user.data.gender
                }
                hide()
                dispatch(login(updatedUser))
                cogoToast.success('Update successfully!')
            })
            .catch((err) => {
                hide()
                if (err.response?.data !== undefined) {
                    cogoToast.error(err.response.data.error)
                } else {
                    cogoToast.error('connection error')
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
                    <Link
                        to='/setting/change_profile_picture'
                        className='text-decoration-none'
                    >
                        <p>Change profile photo</p>
                    </Link>
                </div>
            </div>
            <FormInput
                handleChange={handleInputChange}
                label='Name'
                id='name'
                placeholder='name'
                desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis neque autem voluptatum cupiditate dolore.'
                value={data.name}
            />
            <FormInput
                handleChange={handleInputChange}
                label='Username'
                id='username'
                placeholder='Username'
                desc='Your unique username'
                value={data.username}
            />
            <FormInput
                handleChange={handleInputChange}
                label='Bio'
                id='desc'
                placeholder='desc'
                value={data.desc}
            />
            <div className='row align-items-center mt-5 mb-3'>
                <div className='col-3'></div>
                <div className='col-9 pe-5'>
                    <span className='fw-semibold text-secondary'>
                        Personal Information
                    </span>
                    <p className='text-secondary'>
                        Provide your personal information, even if the account
                        is used for a business, a pet or something else. This
                        won't be a part of your public profile.
                    </p>
                </div>
            </div>
            <FormInput
                handleChange={handleInputChange}
                label='Email'
                id='email'
                placeholder='Email'
                value={data.email}
            />
            <div className='row align-items-center mt-3'>
                <div className='col-3 text-end pe-3'>
                    <label htmlFor='edit_gender' className='fw-semibold mt-1'>
                        Gender
                    </label>
                </div>
                <div className='col-9 pe-5'>
                    <select
                        className='form-select text-capitalize'
                        aria-label='Default select example'
                        id='gender'
                        onChange={handleInputChange}
                    >
                        <option defaultValue={data.gender}>
                            {data.gender}
                        </option>
                        <option
                            value={data.gender === 'male' ? 'female' : 'male'}
                        >
                            {data.gender === 'male' ? 'Female' : 'Male'}
                        </option>
                    </select>
                </div>
            </div>
            <div className='row align-items-center my-4'>
                <div className='col-3 text-end pe-3'></div>
                <div className='col-9 pe-5 text-end'>
                    <button className='btn btn-outline-primary'>Update</button>
                </div>
            </div>
        </form>
    )
}

export function FormInput({
    label,
    id,
    placeholder,
    desc,
    type,
    value,
    handleChange
}) {
    return (
        <div className='row mb-3'>
            <div className='col-3 text-end pe-3'>
                <label htmlFor='edit_username' className='fw-semibold mt-1'>
                    {label}
                </label>
            </div>
            <div className='col-9 align-items-center pe-5'>
                <div className='input-group'>
                    <input
                        type={type ? type : 'text'}
                        id={id}
                        value={value}
                        className='form-control form-control-sm'
                        placeholder={placeholder}
                        aria-label={placeholder}
                        aria-describedby={desc && `${id}_desc`}
                        onChange={handleChange}
                    />
                </div>
                {desc && (
                    <div id={`${id}_desc`} className='form-text'>
                        {desc}
                    </div>
                )}
            </div>
        </div>
    )
}
