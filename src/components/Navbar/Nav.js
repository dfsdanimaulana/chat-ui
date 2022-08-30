import { Link } from 'react-router-dom'

export default function Nav({title}) { 
  return (
        <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top'>
          <div className='container d-flex'>
                <Link className='navbar-brand flex-fill fw-bold' to='/profile'>
                    <i className="bi bi-arrow-left me-3"></i>
                    {title}
                </Link>
          </div>
        </nav>
    )
 } 