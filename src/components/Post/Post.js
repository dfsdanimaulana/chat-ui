import moment from 'moment'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import Avatar from '../Avatar/Avatar'
import './Post.scss'

export default function Post() {
    const { width } = useWindowDimensions()

    return (
        <div
            className="post bg-white"
            style={{
                height: width >= 768 ? '470px' : 'max-content'
            }}
        >
            <div className="post_image bg-info">image</div>
            <div className="post_body">
                <div className="post_header py-1 px-2">
                    <Avatar width={40} image="https://picsum.photos/50" />
                    <span className="card-title fs-6 fw-bold ms-2 text-secondary cursor-pointer">dani</span>
                    <i className="bi bi-bookmark cursor-pointer"></i>
                    <i className="bi bi-three-dots-vertical ms-3 cursor-pointer"></i>
                </div>

                <div className="post_caption p-2">
                    <div className="post_caption_text">
                        <span className="me-2 fw-bold">dani</span>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, praesentium!
                    </div>
                    <p className="post_caption_date">
                        <small className="text-muted">{moment().date()}</small>
                    </p>
                    <div className="post_caption_like">
                        {Array.from(new Array(4)).map((like, i) => (
                            <span key={i} className="post_caption_like_image">
                                <Avatar width={15} thumbnail="false" border image="https://picsum.photos/50" />
                            </span>
                        ))}
                        <span className="ms-2 fs-7">
                            liked by <span className="fw-semibold">dnm17_</span>
                            {true && (
                                <span>
                                    and <span className="fw-semibold">5 others</span>
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                <div className="post_footer bg-warning">footer</div>
            </div>
        </div>
    )
}
