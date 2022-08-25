import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const fakeImages = [
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500',
    'https://picsum.photos/500',
]

export function PostImages({ image }) {
    return (
        <div className='col-4 mb-3'>
            <img src={image[0]} alt='...' className='w-100' />
        </div>
    )
}

export function PostReels({ image }) {
    return (
        <div className='col-4 mb-3'>
            <img src={image} alt='...' className='w-100' />
        </div>
    )
}

export default function PostGrid({ posts }) {
    const { url, path } = useRouteMatch()

    return (
        <>
            <ul className='nav justify-content-center mb-3'>
                <li className='nav-item'>
                    <Link
                        className='nav-link text-secondary'
                        aria-current='page'
                        to={`${url}`}>
                        <i className='bi bi-grid me-1'></i>
                        POSTS
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        className='nav-link text-secondary'
                        to={`${url}/reels`}>
                        <i className='bi bi-file-play me-1'></i>
                        REELS
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                        className='nav-link text-secondary'
                        to={`${url}/saved`}>
                        <i className='bi bi-bi bi-bookmark me-1'></i>
                        SAVED
                    </Link>
                </li>
            </ul>
            <Switch>
                <Route exact path={path}>
                    <div className='row'>
                        {[...posts].reverse().map((post) => (
                            <PostImages
                                key={post._id}
                                image={post.img_post_url}
                            />
                        ))}
                    </div>
                </Route>
                <Route path={`${path}/reels`}>
                    <div className='row'>
                        {fakeImages.slice(2).map((image, i) => (
                            <PostReels key={i} image={image} />
                        ))}
                    </div>
                </Route>
                <Route path={`${path}/saved`}>
                    <div className='row'>
                        {fakeImages.slice(3).map((image, i) => (
                            <PostReels key={i} image={image} />
                        ))}
                    </div>
                </Route>
            </Switch>
        </>
    )
}
