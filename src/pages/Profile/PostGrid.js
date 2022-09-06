import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory
} from 'react-router-dom'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

const fakeImages = [
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500'
]

export function PostImages({ image, imageStyle, postId }) {
    const history = useHistory()

    return (
        <div className='col-4 mb-3 position-relative'>
            {image.length > 1 && (
                <div
                    className='position-absolute top-0 end-0 me-3'
                    style={{
                        fontSize: '12px',
                        color: '#fff'
                    }}
                >
                    <i className='bi bi-back'></i>
                </div>
            )}
            <img
                src={image[0]}
                alt='...'
                style={imageStyle}
                onClick={() => history.push('/profile/posts/' + postId)}
            />
        </div>
    )
}

export function PostReels({ image, imageStyle }) {
    return (
        <div className='col-4 mb-3'>
            <img src={image} alt='...' style={imageStyle} />
        </div>
    )
}

export default function PostGrid({ posts, currentUser }) {
    const { width } = useWindowDimensions()

    const imageStyles = (w) => {
        return {
            height: w < 768 ? '100px' : '200px',
            width: '100%',
            objectFit: 'cover'
        }
    }
    const { url, path } = useRouteMatch()

    return (
        <>
            <ul className='nav justify-content-center mb-3'>
                <li className='nav-item'>
                    <Link
                        className='nav-link text-secondary'
                        aria-current='page'
                        to={url}
                    >
                        <i className='bi bi-grid me-1'></i>
                        POSTS
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        className='nav-link text-secondary'
                        to={`${url}/reels`}
                    >
                        <i className='bi bi-file-play me-1'></i>
                        REELS
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        className='nav-link text-secondary'
                        to={`${url}/saved`}
                    >
                        <i className='bi bi-bi bi-bookmark me-1'></i>
                        SAVED
                    </Link>
                </li>
            </ul>
            <Switch>
                <Route exact path={path}>
                    <div className='row'>
                        {posts &&
                            posts.map((post) => (
                                <PostImages
                                    key={post._id}
                                    postId={post.uniqueId}
                                    image={post.img_post_url}
                                    imageStyle={imageStyles(width)}
                                />
                            ))}
                    </div>
                </Route>
                <Route path={`${path}/reels`}>
                    <div className='row'>
                        {fakeImages.slice(2).map((image, i) => (
                            <PostReels
                                key={i}
                                image={image}
                                imageStyle={imageStyles(width)}
                            />
                        ))}
                    </div>
                </Route>
                <Route path={`${path}/saved`}>
                    <div className='row'>
                        {currentUser.savedPost.map((post) => (
                            <PostImages
                                key={post._id}
                                postId={post.uniqueId}
                                image={post.img_post_url}
                                imageStyle={imageStyles(width)}
                            />
                        ))}
                    </div>
                </Route>
            </Switch>
        </>
    )
}
