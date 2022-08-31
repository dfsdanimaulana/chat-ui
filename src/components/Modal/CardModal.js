import CardOptionList from '../Card/CardOptionList'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const itemStyle = {
    width: '40px',
    height: '40px',
    display: 'grid',
    placeItems: 'center',
    fontSize: '22px',
}

export default function CardModal({ id, data }) {
    const currentUser = useSelector((state) => state.user.value)

    return (
        <div
            className='modal fade'
            id={'cardModal' + id}
            tabIndex='-1'
            aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-body'>
                        <CardOptionList currentUser={currentUser} data={data} />
                    </div>
                    <div className='modal-footer px-4'>
                        <div
                            className='bg-light rounded-circle'
                            style={itemStyle}>
                            <i className='bi bi-share'></i>
                        </div>
                        <div
                            className='bg-light rounded-circle'
                            style={itemStyle}>
                            <i className='bi bi-link-45deg'></i>
                        </div>
                        <div
                            className='bg-light rounded-circle'
                            style={itemStyle}
                            data-bs-dismiss='modal'
                            aria-label='Close'>
                            <Link to={'/qr/' + data._id} className='text-dark'>
                                <i className='bi bi-qr-code-scan'></i>
                            </Link>
                        </div>
                        <div
                            className='bg-light rounded-circle'
                            style={itemStyle}>
                            <i className='bi bi-flag'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
