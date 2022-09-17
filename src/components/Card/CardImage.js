const handleImageClass = (w) => {
    return `d-block w-100 ${w > 768 && 'rounded-start'}`
}

export default function CardImage({ post, id, width }) {
    const imagesPostStyles = (w) => {
        const size = w < 768 ? '390px' : '470px'
        return {
            height: size,
            width: '100%',
            objectFit: 'cover'
        }
    }

    return (
        <div className="col-md-6">
            {post.img_post_url.length > 1 ? (
                <div id={id} className="carousel slide" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target={`#${id}`}
                            data-bs-slide-to={0}
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        />
                        {post.img_post_url.slice(1).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                data-bs-target={`#${id}`}
                                data-bs-slide-to={i + 1}
                                aria-current="false"
                                aria-label={`Slide ${i + 2}`}
                            />
                        ))}
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src={post.img_post_url[0]}
                                className={handleImageClass(width)}
                                alt="..."
                                style={imagesPostStyles(width)}
                            />
                        </div>
                        {post.img_post_url.slice(1).map((item, i) => (
                            <div className="carousel-item" key={i}>
                                <img
                                    src={item}
                                    className={handleImageClass(width)}
                                    alt="..."
                                    style={imagesPostStyles(width)}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            ) : (
                <img
                    id={id}
                    src={post.img_post_url[0]}
                    className={handleImageClass(width)}
                    alt="..."
                    style={imagesPostStyles(width)}
                />
            )}
        </div>
    )
}
