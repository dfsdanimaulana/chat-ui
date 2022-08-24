export default function Avatar({ width, thumbnail }) {
    const imagesThumbStyles = () => {
        return { width: `${width}px`, height: `${width}px`, objectFit: 'cover' }
    }
    return (
        <img
            src='https://picsum.photos/200'
            className={`${!thumbnail && 'img-thumbnail'} rounded-circle`}
            alt='...'
            style={imagesThumbStyles()}></img>
    )
}
