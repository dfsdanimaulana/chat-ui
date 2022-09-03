import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { useState } from 'react'
import cogoToast from 'cogo-toast'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/user'

export default function ChangeProfilePicture({ currentUser }) {
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    const { width } = useWindowDimensions()
    const [imgSrc, setImgSrc] = useState(currentUser.img_thumb)

    const imageStyle = {
        width: width < 768 ? '200px' : '300px',
        height: width < 768 ? '200px' : '300px',
        objectFit: 'cover',
        borderRadius: '50%',
    }

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

        const { hide } = cogoToast.loading('Updating...')

        axiosPrivate
            .put(`/user/update/image`, { image: imgSrc })
            .then((user) => {
                const updatedUser = {
                    ...currentUser,
                    img_thumb: user.data.img_thumb,
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
        <form
            onSubmit={handleSubmit}
            className='row text-center justify-content-center'>
            <div className='mb-3 w-50 position-relative'>
                <img src={imgSrc} alt='...' style={imageStyle} />
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
                <label
                    htmlFor='image'
                    className='position-absolute bottom-0 end-0 me-5'>
                    <i className='bi bi-pencil-square fs-3'></i>
                </label>
            </div>
            <div>
                <button className='btn btn-outline-primary px-5'>Update</button>
            </div>
        </form>
    )
}
