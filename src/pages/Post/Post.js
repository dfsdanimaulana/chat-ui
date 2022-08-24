import { useState } from 'react'
import Avatar from '../../components/Avatar/Avatar'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function Post() {
    const { width } = useWindowDimensions()
    const [imgSrc, setImgSrc] = useState('https://picsum.photos/400')
    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [post, setPost] = useState({
        userId: 'currentUser._id',
        username: 'currentUser.username',
        caption: '',
        hashtag: '',
        image: '',
    })

    const imageStyle = (w) => {
        const size = w >= 768 ? 300 : 200
        return {
            width: `${size}px`,
            height: `${size}px`,
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(post)
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setPost((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }

    // display image before uploading
    const imagePreview = (event) => {
        const allowedExt = /(\.jpg|\.jpeg|\.png)$/i
        if (!allowedExt.exec(event.target.value)) {
            setError(true)
            event.target.value = ''
        } else {
            setError(false)
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader()
                reader.readAsDataURL(event.target.files[0])
                reader.onload = (e) => {
                    setImgSrc(e.target.result)

                    setPost((prevState) => ({
                        ...prevState,
                        image: e.target.result,
                    }))
                }
            }
        }
    }

    return (
        <form className='container my-lg-5' onSubmit={handleSubmit}>
            <div className='row text-center'>
                <div className='col-12 col-md-6  d-flex flex-column justify-content-center align-items-center'>
                    <div className='m-2 m-md-3' style={imageStyle(width)}>
                        <img className='img-thumbnail' src={imgSrc} alt='...' />
                    </div>
                    <div className='m-3'>
                        <label
                            htmlFor='image'
                            className='btn btn-sm btn-outline-secondary'>
                            Select Image
                        </label>
                        <input
                            type='file'
                            name='image'
                            id='image'
                            accept='image/*'
                            onChange={(e) => {
                                imagePreview(e)
                            }}
                            hidden={true}
                        />
                    </div>
                </div>
                <div className='col-12 col-md-6 text-start d-flex flex-column'>
                    <div className='m-3 d-none d-md-flex align-items-center'>
                        <Avatar width={32} thumbnail='false' />
                        <span className='fw-semibold ms-3'>dnm17_</span>
                    </div>
                    <div className='mb-3 flex-fill'>
                        <div className='form-floating h-100'>
                            <textarea
                                className='form-control h-100'
                                placeholder='Leave a comment here'
                                id='caption'
                                required
                                defaultValue={''}
                                onChange={handleChange}
                            />
                            <label htmlFor='caption'>Captions</label>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div className='form-text mb-1 ms-1 text-italic'>
                            Separate by coma
                        </div>
                        <div className='input-group mb-3'>
                            <span
                                className='input-group-text'
                                id='basic-addon1'>
                                #
                            </span>
                            <input
                                type='text'
                                className='form-control'
                                id='hashtag'
                                placeholder='Hashtag'
                                aria-label='Hashtag'
                                aria-describedby='basic-addon1'
                                autoComplete='off'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='mb-3 mt-auto align-self-center align-self-md-end me-3 '>
                        <button className='btn btn-primary px-5'>Post</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
