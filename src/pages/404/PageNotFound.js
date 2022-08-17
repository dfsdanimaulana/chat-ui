import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className='content-wrapper' style={{ minHeight: 3548 }}>
            {/* Content Header (Page header) */}
            <section className='content-header'>
                <div className='container-fluid'>
                    <div className='row mb-2'>
                        <div className='col-sm-6'>
                            <h1>404 Error Page</h1>
                        </div>
                        <div className='col-sm-6'>
                            <ol className='breadcrumb float-sm-right'>
                                <li className='breadcrumb-item'>
                                    <Link to='/'>Home</Link>
                                </li>
                                <li className='breadcrumb-item active'>
                                    404 Error Page
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className='content'>
                <div className='error-page'>
                    <h2 className='headline text-warning'> 404</h2>
                    <div className='error-content'>
                        <h3>
                            <i className='fas fa-exclamation-triangle text-warning' />{' '}
                            Oops! Page not found.
                        </h3>
                        <p>
                            We could not find the page you were looking for.
                            Meanwhile, you may{' '}
                            <a href='../../index.html'>return to dashboard</a>{' '}
                            or try using the search form.
                        </p>
                        <form className='search-form'>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    name='search'
                                    className='form-control'
                                    placeholder='Search'
                                />
                                <div className='input-group-append'>
                                    <button
                                        type='submit'
                                        name='submit'
                                        className='btn btn-warning'>
                                        <i className='fas fa-search' />
                                    </button>
                                </div>
                            </div>
                            {/* /.input-group */}
                        </form>
                    </div>
                    {/* /.error-content */}
                </div>
                {/* /.error-page */}
            </section>
            {/* /.content */}
        </div>
    )
}
