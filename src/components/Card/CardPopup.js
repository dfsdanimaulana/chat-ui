import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import CardOptionList from './CardOptionList'

const itemStyle = {
    width: '50px',
    height: '50px',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
    fontSize: '22px'
}

export default function CardPopup({ post, id }) {
    const { user } = useUser()

    return (
        <div
            className="offcanvas offcanvas-md offcanvas-bottom rounded-5 rounded-bottom d-md-none bg-light"
            tabIndex={-1}
            id={'offcanvasCard' + id}
            aria-labelledby="offcanvasCardLabel"
            style={{
                minHeight: '40vh'
            }}
        >
            <div className="offcanvas-header px-4">
                <div className="bg-info rounded-circle" style={itemStyle}>
                    <i className="bi bi-share"></i>
                </div>
                <div className="bg-info rounded-circle" style={itemStyle}>
                    <i className="bi bi-link-45deg"></i>
                </div>
                <div className="bg-info rounded-circle" style={itemStyle} aria-label="Close">
                    <Link to={'/qr/' + post._id} className="text-light">
                        <i className="bi bi-qr-code-scan"></i>
                    </Link>
                </div>
                <div className="bg-info rounded-circle" style={itemStyle}>
                    <i className="bi bi-flag"></i>
                </div>
            </div>
            <div className="offcanvas-body">
                <CardOptionList post={post} user={user} />
            </div>
        </div>
    )
}
