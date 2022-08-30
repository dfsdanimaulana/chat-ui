import { useSelector } from 'react-redux'
import CardOptionList from './CardOptionList'

const itemStyle = {
    width: '50px',
    height: '50px',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
    fontSize: '22px',
}

export default function CardPopup({ data, id }) {
    const currentUser = useSelector((state) => state.user.value)
    return (
        <div
            className='offcanvas offcanvas-md offcanvas-bottom rounded-5 rounded-bottom d-md-none bg-light'
            tabIndex={-1}
            id={'offcanvasCard' + id}
            aria-labelledby='offcanvasCardLabel'
            style={{
                minHeight: '40vh',
            }}>
            <div className='offcanvas-header px-4'>
                <div className='bg-info rounded-circle' style={itemStyle}>
                    <i className='bi bi-share'></i>
                </div>
                <div className='bg-info rounded-circle' style={itemStyle}>
                    <i className='bi bi-link-45deg'></i>
                </div>
                <div className='bg-info rounded-circle' style={itemStyle}>
                    <i className='bi bi-qr-code-scan'></i>
                </div>
                <div className='bg-info rounded-circle' style={itemStyle}>
                    <i className='bi bi-flag'></i>
                </div>
            </div>
            <div className='offcanvas-body'>
                <CardOptionList data={data} currentUser={currentUser} />
            </div>
        </div>
    )
}


