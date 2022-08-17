import { BrowserRouter as Router, Link } from 'react-router-dom'

export default function ContactsList() {
    return (
        <Router>
            <li>
                <Link to='/'>
                    <img
                        className='contacts-list-img'
                        src='https://source.unsplash.com/random/128x128'
                        alt='User Avatar'
                    />
                    <div className='contacts-list-info'>
                        <span className='contacts-list-name'>
                            Count Dracula
                            <small className='contacts-list-date float-right'>
                                2/28/2015
                            </small>
                        </span>
                        <span className='contacts-list-msg'>
                            How have you been? I was...
                        </span>
                    </div>
                    {/* /.contacts-list-info */}
                </Link>
            </li>
        </Router>
        /* End Contact Item */
    )
}
