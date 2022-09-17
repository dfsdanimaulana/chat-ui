import { useUser } from '../../hooks/useUser'

const imagesThumbStyles = (w, b) => {
    return {
        width: `${w}px`,
        height: `${w}px`,
        objectFit: 'cover',
        border: b && '1.5px solid #fff'
    }
}

export default function Avatar({ width, thumbnail, image, placeholder, border }) {
    const { user } = useUser()

    if (placeholder) {
        return <div className="placeholder rounded-circle" style={imagesThumbStyles()}></div>
    }
    return (
        <img
            src={image ? image : user.img_thumb}
            className={`${!thumbnail && 'img-thumbnail'} rounded-circle`}
            alt="..."
            style={imagesThumbStyles(width, border)}
        ></img>
    )
}
