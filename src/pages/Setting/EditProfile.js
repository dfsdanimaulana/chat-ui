import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'

function FormInput({
    label,
    id,
    placeholder,
    desc,
    type,
    value,
    handleChange,
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

export default function EditProfile() {
    const currentUser = useSelector((state) => state.user.value)
    const [data, setData] = useState({
        username: currentUser.username,
        name: currentUser.name,
        email: currentUser.email,
        desc: currentUser.desc,
        gender: currentUser.gender,
    })

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='row align-items-center mt-3'>
                <div className='col-3 text-end pe-3'>
                    <Avatar width={32} thumbnail='false' />
                </div>
                <div className='col-9 pe-5'>
                    <div className='fw-semibold fs-5'>
                        {currentUser.username}
                    </div>
                    <Link to='#' className='text-decoration-none'>
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
                        onChange={handleInputChange}>
                        <option defaultValue={data.gender}>
                            {data.gender}
                        </option>
                        <option
                            value={data.gender === 'male' ? 'female' : 'male'}>
                            Female
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
