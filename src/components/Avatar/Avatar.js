import { useSelector } from 'react-redux'

export default function Avatar({ width, thumbnail, image, placeholder, border }) {
    const currentUser = useSelector((state) => state.user.value) // @typeof currentUser Object

    const imagesThumbStyles = () => {
        return {
            width: `${width}px`,
            height: `${width}px`,
            objectFit: 'cover',
            border: border && '1.5px solid #fff'
        }
    }

    if (placeholder) {
        return (
            <div
                className='placeholder rounded-circle'
                style={imagesThumbStyles()}
            ></div>
        )
    }
    return (
        <img
            src={image ? image : currentUser.img_thumb}
            className={`${!thumbnail && 'img-thumbnail'} rounded-circle`}
            alt='...'
            style={imagesThumbStyles()}
        ></img>
    )
}
