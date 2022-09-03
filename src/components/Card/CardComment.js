// state management
import { useSelector } from 'react-redux'
import { getCommentsValue } from '../../redux/comments'

// components
import Avatar from '../Avatar/Avatar'

export default function CardComment({ post, height }) {
    const comments = useSelector(getCommentsValue)

    return (
        <div className='h-100'>
            <div className='card-header bg-white d-flex justify-content-between align-items-center'>
                <div>
                    <Avatar width={24} thumbnail='false' />
                    <span className='card-title fs-6 fw-bold ms-2 text-secondary'>
                        {post.user.username}
                    </span>
                </div>
                <i className='bi bi-three-dots'></i>
            </div>
            <div
                className='card-body p-0 overflow-auto'
                style={{
                    height: `${height - 45}px`,
                }}>
                <ul className='list-group list-group-flush '>
                    {comments &&
                        comments.map((comment) => (
                            <Comment key={comment._id} comment={comment} />
                        ))}
                </ul>
            </div>
        </div>
    )
}

function Comment({ comment }) {
    return (
        <li className='list-group-item border-none'>
            <div className='row'>
                <div className='col-1 d-flex justify-content-center pt-2'>
                    <Avatar width={24} thumbnail='false' />
                </div>
                <div className='col-10'>
                    <div className='mb-1'>
                        <span className='fw-semibold me-1'>
                            {comment.sender.username}
                        </span>
                        <span>{comment.msg}</span>
                    </div>
                    <div
                        style={{
                            fontSize: '12px',
                        }}>
                        <span className='me-1'>2h</span>
                        <span className='me-1'>3 likes</span>
                        <span
                            className='me-1 fw-semibold'
                            style={{
                                cursor: 'pointer',
                            }}>
                            Replay
                        </span>
                    </div>
                </div>
                <div className='col-1 d-flex justify-content-center align-items-center'>
                    <i className='bi bi-heart'></i>
                </div>
            </div>
        </li>
    )
}
