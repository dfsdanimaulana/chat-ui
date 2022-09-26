import { Link } from 'react-router-dom'
import NotFoundSVG from '../../assets/svg/404.svg'

export default function PageNotFound() {
    return (
        <div className="container vw-100 vh-100">
            <div className="row text-center p-5">
                <img
                    src={NotFoundSVG}
                    alt="404 page"
                    style={{
                        height: '400px'
                    }}
                ></img>
                <h1 className="fw-bold mt-5">Page Not Found</h1>
                <Link to="/">
                    <h5>Go Home</h5>
                </Link>
            </div>
        </div>
    )
}
