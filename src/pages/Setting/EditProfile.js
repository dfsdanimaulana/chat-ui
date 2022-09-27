import { useState } from 'react'
import cogoToast from 'cogo-toast'
import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

// components
import Avatar from '../../components/Avatar/Avatar'

export default function EditProfile({ user }) {
    const { update } = useUser()
    const axiosPrivate = useAxiosPrivate()

    const [data, setData] = useState({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        desc: user.desc,
        gender: user.gender
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
            data._id === user._id &&
            data.username === user.username &&
            data.name === user.name &&
            data.email === user.email &&
            data.desc === user.desc &&
            data.gender === user.gender
        ) {
            hide()
            cogoToast.info('Nothing to update!')
            return
        }
        axiosPrivate
            .put(`/user/update`, data)
            .then((res) => {
                const updatedUser = {
                    ...user,
                    username: res.data.username,
                    name: res.data.name,
                    email: res.data.email,
                    desc: res.data.desc,
                    gender: res.data.gender
                }
                hide()
                update(updatedUser)
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
            <div className="row align-items-center my-3">
                <div className="col-3 text-end pe-3">
                    <Avatar width={42} thumbnail="false" />
                </div>
                <div className="col-9 pe-5">
                    <div className="fw-semibold fs-5">{user.username}</div>
                    <Link to="/setting/change_profile_picture" className="text-decoration-none">
                        <p>Change profile photo</p>
                    </Link>
                </div>
            </div>
            <FormInput
                handleChange={handleInputChange}
                label="Name"
                id="name"
                placeholder="name"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis neque autem voluptatum cupiditate dolore."
                value={data.name}
            />
            <FormInput
                handleChange={handleInputChange}
                label="Username"
                id="username"
                placeholder="Username"
                desc="Your unique username"
                value={data.username}
            />
            <FormInput handleChange={handleInputChange} label="Bio" id="desc" placeholder="desc" value={data.desc} />
            <div className="row align-items-center mt-5 mb-3">
                <div className="col-3"></div>
                <div className="col-9 pe-5">
                    <span className="fw-semibold text-secondary">Personal Information</span>
                    <p className="text-secondary">
                        Provide your personal information, even if the account is used for a business, a pet or something
                        else. This won't be a part of your public profile.
                    </p>
                </div>
            </div>
            <FormInput handleChange={handleInputChange} label="Email" id="email" placeholder="Email" value={data.email} />
            <div className="row align-items-center mt-3">
                <div className="col-3 text-end pe-3">
                    <label htmlFor="edit_gender" className="fw-semibold mt-1">
                        Gender
                    </label>
                </div>
                <div className="col-9 pe-5">
                    <select
                        className="form-select text-capitalize"
                        aria-label="Default select example"
                        id="gender"
                        onChange={handleInputChange}
                    >
                        <option defaultValue={data.gender}>{data.gender}</option>
                        <option value={data.gender === 'male' ? 'female' : 'male'}>
                            {data.gender === 'male' ? 'Female' : 'Male'}
                        </option>
                    </select>
                </div>
            </div>
            <div className="row align-items-center my-4">
                <div className="col-3 text-end pe-3"></div>
                <div className="col-9 pe-5 text-end">
                    <button className="btn btn-primary">Update</button>
                </div>
            </div>
        </form>
    )
}

export function FormInput({ label, id, placeholder, desc, type, value, handleChange, required }) {
    return (
        <div className="row mb-3">
            <div className="col-3 text-end pe-3">
                <label htmlFor="edit_username" className="fw-semibold mt-1">
                    {label}
                </label>
            </div>
            <div className="col-9 align-items-center pe-5">
                <div className="input-group">
                    <input
                        type={type ? type : 'text'}
                        id={id}
                        value={value}
                        className="form-control form-control-sm"
                        placeholder={placeholder}
                        aria-label={placeholder}
                        aria-describedby={desc && `${id}_desc`}
                        onChange={handleChange}
                        required={required}
                    />
                </div>
                {desc && (
                    <div id={`${id}_desc`} className="form-text">
                        {desc}
                    </div>
                )}
            </div>
        </div>
    )
}
