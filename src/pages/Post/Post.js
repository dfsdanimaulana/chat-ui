import { useState } from 'react'
import Avatar from '../../components/Avatar/Avatar'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useSelector } from 'react-redux'

export default function Post() {
    const axiosPrivate = useAxiosPrivate()
    const currentUser = useSelector((state) => state.user.value) // @typeof currentUser Object
    const { width } = useWindowDimensions()
    const [imgSrc, setImgSrc] = useState([
        'https://i.ibb.co/g3ffFKB/camera.png',
    ])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [post, setPost] = useState({
        userId: currentUser._id,
        username: currentUser.username,
        caption: '',
        hashtag: '',
        image: [],
    })

    const imageStyle = (w) => {
        const size = w > 768 ? 300 : 200
        return {
            width: `${size}px`,
            height: `${size}px`,
            objectFit: 'cover',
        }
    }

    const carouselStyle = (w) => {
        const size = w >= 768 ? 300 : 200
        return {
            width: `${size}px`,
            height: `${size}px`,
        }
    }

    const handleSubmit = (e) => {
        setError(false)
        setIsPending(true)
        e.preventDefault()

        if (post.image.length < 1) {
            setIsPending(false)
            setError('Please select an image')
            return
        }

        axiosPrivate
            .post(`/post`, post)
            .then((res) => {
                setIsPending(false)
                setImgSrc(['https://i.ibb.co/g3ffFKB/camera.png'])
                setSuccess(true)
                setPost((prevState) => ({
                    ...prevState,
                    caption: '',
                    hashtag: '',
                    image: [],
                }))
            })
            .catch((err) => {
                setIsPending(false)
                setError(err?.message || 'failed to upload')
                setImgSrc(['https://i.ibb.co/g3ffFKB/camera.png'])
                setPost((prevState) => ({
                    ...prevState,
                    caption: '',
                    hashtag: '',
                    image: [],
                }))
            })
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
        setImgSrc(['https://i.ibb.co/g3ffFKB/camera.png'])
        const allowedExt = /(\.jpg|\.jpeg|\.png)$/i
        if (!allowedExt.exec(event.target.value)) {
            setError(true)
            event.target.value = ''
        } else {
            setError(false)
            // multiple images
            if (event.target.files && event.target.files[0]) {
                const files = [...event.target.files]
                files.map((file) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    return (reader.onload = (e) => {
                        setImgSrc((prevState) => [
                            ...prevState,
                            e.target.result,
                        ])

                        setPost((prevState) => ({
                            ...prevState,
                            image: [...prevState.image, e.target.result],
                        }))
                    })
                })
            }
        }
    }

    return (
        <form className='container my-3 my-lg-5' onSubmit={handleSubmit}>
            <div className='row text-center'>
                <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-center'>
                    {error && (
                        <div
                            className='alert alert-danger d-flex align-items-center alert-dismissible fade show'
                            role='alert'>
                            <i className='bi bi-radioactive me-2'></i>
                            <div>{error}</div>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='alert'
                                aria-label='Close'
                                onClick={() => setError(false)}></button>
                        </div>
                    )}
                    {success && (
                        <div
                            className='alert alert-success d-flex align-items-center alert-dismissible fade show'
                            role='alert'>
                            <i className='bi bi-check-circle me-2'></i>
                            <div>Posted!</div>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='alert'
                                aria-label='Close'
                                onClick={() => setSuccess(false)}></button>
                        </div>
                    )}

                    {imgSrc.length > 2 ? (
                        <div
                            id='postImageCarousel'
                            className='carousel slide m-2 m-md-3 border'
                            data-bs-ride='carousel'
                            style={carouselStyle(width)}>
                            <div className='carousel-inner'>
                                <div className='carousel-item active'>
                                    <img
                                        src={
                                            imgSrc.length > 1
                                                ? imgSrc[1]
                                                : imgSrc[0]
                                        }
                                        className='img-thumbnail'
                                        alt='...'
                                        style={imageStyle(width)}
                                    />
                                </div>
                                {imgSrc.slice(2).map((img, i) => (
                                    <div key={i} className='carousel-item'>
                                        <img
                                            src={img}
                                            className='img-thumbnail'
                                            alt='...'
                                            style={imageStyle(width)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className='carousel-control-prev'
                                type='button'
                                data-bs-target='#postImageCarousel'
                                data-bs-slide='prev'>
                                <span
                                    className='carousel-control-prev-icon'
                                    aria-hidden='true'
                                />
                                <span className='visually-hidden'>
                                    Previous
                                </span>
                            </button>
                            <button
                                className='carousel-control-next'
                                type='button'
                                data-bs-target='#postImageCarousel'
                                data-bs-slide='next'>
                                <span
                                    className='carousel-control-next-icon'
                                    aria-hidden='true'
                                />
                                <span className='visually-hidden'>Next</span>
                            </button>
                        </div>
                    ) : (
                        <div className='m-2 m-md-3'>
                            <img
                                className='img-thumbnail'
                                src={imgSrc.length > 1 ? imgSrc[1] : imgSrc[0]}
                                alt='...'
                                style={imageStyle(width)}
                            />
                        </div>
                    )}
                    <div className='m-3'>
                        <label
                            htmlFor='image'
                            className='btn btn-sm btn-outline-success'>
                            Select Image
                        </label>
                        <input
                            type='file'
                            multiple
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
                        <span className='fw-semibold ms-3'>
                            {currentUser.username}
                        </span>
                    </div>
                    <div className='mb-3 flex-fill'>
                        <div className='form-floating h-100'>
                            <textarea
                                className='form-control h-100'
                                placeholder='Leave a comment here'
                                id='caption'
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
                        {isPending && (
                            <button className='btn btn-primary px-5'>
                                Posting...
                            </button>
                        )}
                        {!isPending && (
                            <button className='btn btn-primary px-5'>
                                Post
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}
