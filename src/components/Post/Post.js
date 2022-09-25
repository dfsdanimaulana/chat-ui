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
                        <span className='me-2 fw-bold'>dani</span>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, praesentium!
                    </div>
                    <p className="post_caption_date">a day ago</p>
                    <div className="post_caption_like">Liked by 4 people</div>
                </div>
                <div className="post_footer bg-warning">footer</div>
            </div>
        </div>
    )
}
