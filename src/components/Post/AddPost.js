import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import BASE_URL from '../../config'

const AddPost = () => {
    const currentUser = useSelector((state) => state.user.value)
    const history = useHistory()

    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [post, setPost] = useState({
        userId: currentUser._id,
        username: currentUser.username,
        caption: '',
        hashtag: '',
        image: ''
    })

    const [imgSrc, setImgSrc] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsPending(true)

        axios
            .post(`${BASE_URL}/post`, post)
            .then((res) => {
                setIsPending(false)
                history.push('/')
            })
            .catch((err) => {
                setIsPending(false)
                setError(true)
            })
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setPost((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    // menampilkan preview image sebaelum di upload
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
                        image: e.target.result
                    }))
                }
            }
        }
    }

    return (
        <div className="card m-2 mx-md-5 mb-5 mb-sm-0">
            <div className="card-header">
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Upss</strong> Failed to send your post.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    </div>
                )}

                <div className="user-block">
                    <img className="img-circle" src="https://source.unsplash.com/random/128x128" alt="Not found" />
                    <span className="username">{currentUser.username ? currentUser.username : 'No User'}</span>
                    <span className="description">
                        Edit post location
                        <Link to="#">
                            <i className="far fa-edit ms-2"></i>
                        </Link>
                    </span>
                </div>
                {/* /.user-block */}
                <div className="card-tools">
                    <button type="button" className="btn btn-tool" title="More Options">
                        <i className="far fa-circle"></i>
                    </button>
                </div>
                {/* /.card-tools */}
            </div>
            {/* /.card-header */}
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            {imgSrc ? (
                                <img className="img-fluid pad mb-3" src={imgSrc} alt="Not Found" />
                            ) : (
                                <div className="card">
                                    <div className="card-body">Select Image</div>
                                </div>
                            )}
                        </label>
                        <input
                            className="form-control"
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                imagePreview(e)
                            }}
                            hidden={true}
                        />
                    </div>
                    <div className="form-floating mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Leave a caption here"
                            id="caption"
                            required
                            defaultValue={''}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingTextarea">
                            <p className="fw-normal fst-italic">Caption</p>
                        </label>
                    </div>

                    <div className='input-group aria-describedby="hashHelp"'>
                        <span className="input-group-text">#</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Hashtag"
                            id="hashtag"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-text" id="hashHelp">
                        Separate by space.
                    </div>
                    <div className="d-grid my-3">
                        {isPending ? (
                            <button className="btn btn-primary" type="button" disabled>
                                Posting
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-primary">
                                Post
                            </button>
                        )}
                    </div>
                </form>
            </div>
            {/* /.card-body */}
        </div>
    )
}

export default AddPost
