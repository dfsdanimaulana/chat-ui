import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom'

const fakeImages = [
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500'
]

const imageStyles = {
    width: '100%',
    objectFit: 'cover',
    aspectRatio: '1/1'
}

export default function PostGrid({ post, user }) {
    const { url, path } = useRouteMatch()

    return (
        <>
            <ul className="nav justify-content-center mb-3">
                <li className="nav-item">
                    <Link className="nav-link text-secondary" aria-current="page" to={url}>
                        <i className="bi bi-grid me-1"></i>
                        POSTS
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-secondary" to={`${url}/reels`}>
                        <i className="bi bi-file-play me-1"></i>
                        REELS
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-secondary" to={`${url}/saved`}>
                        <i className="bi bi-bi bi-bookmark me-1"></i>
                        SAVED
                    </Link>
                </li>
            </ul>
            <Switch>
                <Route exact path={path}>
                    <div className="row post_grid">
                        {post &&
                            post.map((pst) => (
                                <PostImages
                                    key={pst._id}
                                    postId={pst.uniqueId}
                                    image={pst.img_post_url}
                                    imageStyle={imageStyles}
                                />
                            ))}
                    </div>
                </Route>
                <Route path={`${path}/reels`}>
                    <div className="row post_grid">
                        {fakeImages.slice(2).map((image, i) => (
                            <PostReels key={i} image={image} imageStyle={imageStyles} />
                        ))}
                    </div>
                </Route>
                <Route path={`${path}/saved`}>
                    <div className="row post_grid">
                        {[...user.savedPost].reverse().map((post) => (
                            <SavedPostImages
                                key={post._id}
                                postId={post.uniqueId}
                                image={post.img_post_url}
                                imageStyle={imageStyles}
                            />
                        ))}
                    </div>
                </Route>
            </Switch>
        </>
    )
}

export function PostImages({ image, imageStyle, postId }) {
    const history = useHistory()

    return (
        <div className="position-relative">
            {image.length > 1 && (
                <div
                    className="position-absolute top-0 end-0 me-3"
                    style={{
                        fontSize: '12px',
                        color: '#fff'
                    }}
                >
                    <i className="bi bi-back"></i>
                </div>
            )}
            <img src={image[0]} alt="..." style={imageStyle} onClick={() => history.push('/profile/posts/' + postId)} />
        </div>
    )
}

export function SavedPostImages({ image, imageStyle, postId }) {
    return (
        <div className="position-relative">
            {image.length > 1 && (
                <div
                    className="position-absolute top-0 end-0 me-3"
                    style={{
                        fontSize: '12px',
                        color: '#fff'
                    }}
                >
                    <i className="bi bi-back"></i>
                </div>
            )}
            <img src={image[0]} alt="..." style={imageStyle}/>
        </div>
    )
}

export function PostReels({ image, imageStyle }) {
    return (
        <div className="mb-3">
            <img src={image} alt="..." style={imageStyle} />
        </div>
    )
}
