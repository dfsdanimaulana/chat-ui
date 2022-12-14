import moment from 'moment'
import Avatar from '../Avatar/Avatar'
import CardHeader from './CardHeader'

export default function CardCaption({ post, width, setIsOpen, id }) {
    const likedUser = post.like.length > 3 ? [...post.like].slice(0, 3) : [...post.like]

    return (
        <div className="p-2 h-100 d-flex flex-column">
            <div className="d-none d-md-flex mt-2 mb-3 justify-content-between">
                <CardHeader post={post} width={width} setIsOpen={setIsOpen} id={id} />
            </div>
            {post.like.length >= 1 && (
                <div className="mb-2 pe-2 d-md-none">
                    {likedUser.map((like, i) => (
                        <span
                            key={i}
                            style={{
                                position: 'relative',
                                marginRight: '-3px'
                            }}
                        >
                            <Avatar width={15} thumbnail="false" border image={like.img_thumb} />
                        </span>
                    ))}
                    <span className="ms-2 fs-7">
                        liked by <span className="fw-semibold">{post.like[0].username}</span>{' '}
                        {post.like.length > 1 && (
                            <span>
                                and <span className="fw-semibold">{post.like.length - 1} others</span>
                            </span>
                        )}
                    </span>
                </div>
            )}
            <p className="card-text px-1">
                <span className="fw-semibold">{post.user.username}</span> {post.caption}
            </p>
            <div className="my-1 d-flex">
                {post.hashtag.map((h, i) => (
                    <span key={i} className="text-primary me-1 fw-light cursor-pointer">
                        #{h}
                    </span>
                ))}
            </div>
            <div className="mt-auto d-flex justify-content-between px-1">
                <p className="card-text fs-7">
                    <small className="text-muted">{moment(post.createdAt).fromNow()}</small>
                </p>
                {post.like.length >= 1 && (
                    <div className="d-none d-md-block">
                        {likedUser.map((like, i) => (
                            <span
                                key={i}
                                style={{
                                    position: 'relative',
                                    marginRight: '-3px'
                                }}
                            >
                                <Avatar width={15} thumbnail="false" border image={like.img_thumb} />
                            </span>
                        ))}

                        <span className="ms-2 fs-7">
                            liked by <span className="fw-semibold">{post.like[0].username}</span>{' '}
                            {post.like.length > 1 && (
                                <span>
                                    and <span className="fw-semibold">{post.like.length - 1} others</span>
                                </span>
                            )}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
