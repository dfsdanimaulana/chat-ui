import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div
            className='navbar navbar-expand navbar-dark bg-light text-center d-none d-md-flex flex-column mt-auto'
            style={{
                fontSize: '12px'
            }}
        >
            <ul className='nav justify-content-center'>
                <li className='nav-item text-light'>
                    <Link className='nav-link' to='#'>
                        About
                    </Link>
                </li>
                <li className='nav-item text-light'>
                    <Link className='nav-link' to='#'>
                        Api
                    </Link>
                </li>
                <li className='nav-item text-light'>
                    <Link className='nav-link' to='#'>
                        Privacy
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='#'>
                        Contact Us
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='#'>
                        Help
                    </Link>
                </li>
            </ul>
            <ul className='nav justify-content-center'>
                <li className='nav-item text-light d-flex'>
                    <select
                        name='language'
                        id='language'
                        style={{
                            outline: 'none',
                            border: 'none',
                            color: '#0b61de',
                            backgroundColor: '#f8f9fa'
                        }}
                    >
                        <option defaultValue={'english'}>English</option>
                        <option value='indonesia'>Indonesia</option>
                        <option value='china'>China</option>
                    </select>
                </li>
                <li className='nav-item text-light'>
                    <Link className='nav-link' to='#'>
                        &copy; 2022 from DanCompany
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Footer
