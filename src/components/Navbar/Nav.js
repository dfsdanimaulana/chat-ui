import { useHistory } from 'react-router-dom'

export default function Nav({ title }) {
    const history = useHistory()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container d-flex">
                <span className="navbar-brand flex-fill fw-bold" onClick={() => history.goBack()}>
                    <i className="bi bi-arrow-left me-3"></i>
                    {title}
                </span>
            </div>
        </nav>
    )
}
