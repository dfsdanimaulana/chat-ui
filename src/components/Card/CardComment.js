// helpers
import moment from 'moment'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useUser } from '../../hooks/useUser'
import { useComments } from '../../hooks/useComments'
import cogoToast from 'cogo-toast'

// components
import Avatar from '../Avatar/Avatar'

export default function CardComment({ post, height, comments }) {
    return (
        <div className="h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div>
                    <Avatar width={24} thumbnail="false" image={post.user.img_thumb} />
                    <span className="card-title fs-6 fw-bold ms-2 text-secondary">{post.user.username}</span>
                </div>
                <i className="bi bi-three-dots-vertical"></i>
            </div>
            <div
                className="card-body p-0 overflow-auto"
                style={{
                    height: `${height - 45}px`
                }}
            >
                <ul className="list-group list-group-flush ">
                    {comments && comments.reverse().map((comment) => <Comment key={comment._id} comment={comment} />)}
                </ul>
            </div>
        </div>
    )
}

function Comment({ comment }) {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useUser()
    const { getComments } = useComments()

    const handleLike = () => {
        axiosPrivate
            .post('/comment/' + comment._id, {
                userId: user._id
            })
            .then((res) => {
                getComments()
                cogoToast.success(res.data.message)
            })
            .catch((err) => {
                cogoToast.error(err.message)
            })
    }

    const likeClass = () => {
        return comment.like.includes(user._id) ? 'bi bi-heart-fill ms-1' : 'bi bi-heart ms-1'
    }

    return (
        <li className="list-group-item border-none">
            <div className="row">
                <div className="col-2 col-md-1 d-flex justify-content-center pt-2">
                    <Avatar width={24} thumbnail="false" image={comment.sender.img_thumb} />
                </div>
                <div className="col-7 col-md-9">
                    <div className="mb-1">
                        <span className="fw-semibold me-1">{comment.sender.username}</span>
                        <span>{comment.msg}</span>
                    </div>
                    <div
                        style={{
                            fontSize: '12px'
                        }}
                    >
                        <span className="me-2">{moment(comment.createdAt).fromNow(true)}</span>
                        <span className="me-2">{comment.like.length} likes</span>
                        <span
                            className="me-1 fw-semibold"
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            Replay
                        </span>
                    </div>
                </div>
                <div className="col-3 col-md-2 d-flex justify-content-around pt-2">
                    <i
                        className="bi bi-three-dots text-secondary"
                        style={{
                            fontSize: '12px'
                        }}
                    ></i>
                    <i className={likeClass()} onClick={handleLike}></i>
                </div>
            </div>
        </li>
    )
}
