import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useState } from 'react'
import cogoToast from 'cogo-toast'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { usePosts } from '../../hooks/usePosts'
import { useComments } from '../../hooks/useComments'
import { useUser } from '../../hooks/useUser'
import { usePost } from '../../hooks/usePost'

const imageStyle = (w) => {
    return {
        width: w < 768 ? '200px' : '300px',
        height: w < 768 ? '200px' : '300px',
        objectFit: 'cover',
        borderRadius: '50%'
    }
}

export default function ChangeProfilePicture() {
    const { login, user } = useUser()
    const { getPosts } = usePosts()
    const { getPost } = usePost()
    const { getComments } = useComments()
    const axiosPrivate = useAxiosPrivate()
    const { width } = useWindowDimensions()
    const [imgSrc, setImgSrc] = useState(user.img_thumb)

    // display image before uploading
    const imagePreview = (event) => {
        const allowedExt = /(\.jpg|\.jpeg|\.png)$/i
        if (!allowedExt.exec(event.target.value)) {
            cogoToast.error('File not allowed!')
            event.target.value = ''
        } else {
            // multiple images
            if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.readAsDataURL(file)
                return (reader.onload = (e) => {
                    setImgSrc(e.target.result)
                })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (imgSrc === user.img_thumb) {
            cogoToast.info('Nothing to update!')
            return
        }

        const { hide } = cogoToast.loading('Updating...')

        axiosPrivate
            .put(`/user/update/image`, {
                id: user._id,
                publicId: user.img_thumb_id,
                image: imgSrc
            })
            .then((res) => {
                const updatedUser = {
                    ...user,
                    img_thumb: res.data.img_thumb
                }

                hide()
                login(updatedUser)
                getPosts()
                getPost(user._id)
                getComments()
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
        <form onSubmit={handleSubmit} className={`row ${width < 768 && 'vh-100'} text-center justify-content-center`}>
            <div
                className="mb-3 w-50 position-relative mt-5 mt-md-0"
                style={{
                    height: width < 768 ? '200px' : 'max-content'
                }}
            >
                <img src={imgSrc} alt="..." style={imageStyle(width)} />
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => {
                        imagePreview(e)
                    }}
                    hidden={true}
                />
                <label htmlFor="image" className="position-absolute bottom-0 end-0 me-1 me-md-5">
                    <i className="bi bi-pencil-square fs-3"></i>
                </label>
            </div>
            <div>
                <button className="btn btn-outline-primary px-5">Update</button>
            </div>
        </form>
    )
}
