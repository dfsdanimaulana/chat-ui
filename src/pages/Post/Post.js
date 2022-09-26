import { useState } from 'react'
import cogoToast from 'cogo-toast'
import { generateRandomId } from '../../utils/generateRandomId'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useUser } from '../../hooks/useUser'
import { usePost } from '../../hooks/usePost'
import { usePosts } from '../../hooks/usePosts'

// components
import Avatar from '../../components/Avatar/Avatar'

const imageStyle = (w) => {
    const size = w > 768 ? 300 : 200
    return {
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'cover'
    }
}

const carouselStyle = (w) => {
    const size = w >= 768 ? 300 : 200
    return {
        width: `${size}px`,
        height: `${size}px`
    }
}

const initialImgSrc = ['https://i.ibb.co/g3ffFKB/camera.png']

export default function Post() {
    const axiosPrivate = useAxiosPrivate()
    const { width } = useWindowDimensions()
    const { user } = useUser()
    const { getPost } = usePost()
    const { getPosts } = usePosts()

    const initialData = {
        userId: user._id,
        username: user.username,
        uniqueId: '',
        caption: '',
        hashtag: '',
        image: [],
        video: null
    }

    const [imgSrc, setImgSrc] = useState(initialImgSrc)
    const [videoSrc, setVideoSrc] = useState(null)
    const [fileType, setFileType] = useState('image')
    const [data, setData] = useState(initialData)

    const setDefault = () => {
        setImgSrc(initialImgSrc)
        setFileType('image')
        setVideoSrc(null)
        setData(initialData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { hide } = cogoToast.loading('Loading...')

        if (!data.image.length && !data.video) {
            hide()
            cogoToast.error('Please select image or video')
            return
        }

        axiosPrivate
            .post(`/post`, data)
            .then((res) => {
                getPost(user._id)
                getPosts()
                setDefault()

                hide()
                cogoToast.success('Posted successfully!')
            })
            .catch((err) => {
                hide()
                cogoToast.error(err?.error || 'failed to upload')
                setDefault()
            })
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setData((prevState) => ({
            ...prevState,
            uniqueId: generateRandomId(),
            [id]: value
        }))
    }

    // display image before uploading
    const imageVideoPreview = (event) => {
        setImgSrc(initialImgSrc)
        const allowedImageExt = /(\.jpg|\.jpeg|\.png)$/i
        const allowedVideoExt = /(\.mp4|\.webm|\.ogg)$/i

        // handle images
        if (allowedImageExt.exec(event.target.value)) {
            if (event.target.files && event.target.files[0]) {
                const files = [...event.target.files]
                setFileType('image')
                setVideoSrc(null)
                files.map((file) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    return (reader.onload = (e) => {
                        setImgSrc((prevState) => [...prevState, e.target.result])

                        setData((prevState) => ({
                            ...prevState,
                            uniqueId: generateRandomId(),
                            image: [...prevState.image, e.target.result]
                        }))
                    })
                })
            }
            return
        }

        // handle video
        if (allowedVideoExt.exec(event.target.value)) {
            if (event.target.files && event.target.files[0]) {
                let file = event.target.files[0]
                let blobURL = URL.createObjectURL(file)
                setFileType('video')
                setVideoSrc(blobURL)
                setData((prevState) => ({
                    ...prevState,
                    uniqueId: generateRandomId(),
                    video: blobURL
                }))
            }
            return
        }
        cogoToast.error('File not allowed!')
        setFileType('image')
        event.target.value = ''
    }

    return (
        <form className="container mt-3 pb-5 py-lg-5" onSubmit={handleSubmit}>
            <div className="row text-center">
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                    {fileType === 'image' && imgSrc.length > 2 && (
                        <div
                            id="postImageCarousel"
                            className="carousel slide m-2 m-md-3 border"
                            data-bs-ride="carousel"
                            style={carouselStyle(width)}
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        src={imgSrc.length > 1 ? imgSrc[1] : imgSrc[0]}
                                        className="img-thumbnail"
                                        alt="..."
                                        style={imageStyle(width)}
                                    />
                                </div>
                                {imgSrc.slice(2).map((img, i) => (
                                    <div key={i} className="carousel-item">
                                        <img src={img} className="img-thumbnail" alt="..." style={imageStyle(width)} />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#postImageCarousel"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#postImageCarousel"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    )}
                    {fileType === 'image' && imgSrc.length <= 2 && (
                        <div className="m-2 m-md-3">
                            <img
                                className="img-thumbnail"
                                src={imgSrc.length > 1 ? imgSrc[1] : imgSrc[0]}
                                alt="..."
                                style={imageStyle(width)}
                            />
                        </div>
                    )}
                    {fileType === 'video' && (
                        <video style={imageStyle(width)} controls>
                            <source src={videoSrc} />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <div className="m-3">
                        <label htmlFor="image" className="btn btn-sm btn-outline-success">
                            Select Image or Video
                        </label>
                        <input
                            type="file"
                            multiple
                            name="image"
                            id="image"
                            accept="image/*,video/*"
                            onChange={(e) => {
                                imageVideoPreview(e)
                            }}
                            hidden={true}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 text-start d-flex flex-column">
                    <div className="m-3 d-none d-md-flex align-items-center">
                        <Avatar width={32} thumbnail="false" />
                        <span className="fw-semibold ms-3">{user.username}</span>
                    </div>
                    <div className="mb-3 flex-fill">
                        <div className="form-floating h-100">
                            <textarea
                                className="form-control h-100"
                                placeholder="Leave a comment here"
                                id="caption"
                                required
                                value={data.caption}
                                onChange={handleChange}
                            />
                            <label htmlFor="caption">Captions</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-text mb-1 ms-1 text-italic">Separate by space</div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                #
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="hashtag"
                                placeholder="Hashtag"
                                aria-label="Hashtag"
                                aria-describedby="basic-addon1"
                                autoComplete="off"
                                onChange={handleChange}
                                value={data.hashtag}
                            />
                        </div>
                    </div>
                    <div className="mb-3 mt-auto align-self-center align-self-md-end me-3 ">
                        <button className="btn btn-primary px-5">Post</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
