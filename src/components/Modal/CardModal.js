import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ReactModal from 'react-modal'

// state management
import { useSelector } from 'react-redux'

//hooks
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

// components
import CardOptionList from '../Card/CardOptionList'

const itemStyle = {
    width: '40px',
    height: '40px',
    display: 'grid',
    placeItems: 'center',
    fontSize: '22px',
}

const cardStyle = {
    width: '300px',
    height: '350px',
}
const overlyStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, .25)',
    zIndex: 9999999,
}
const contentStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'grid',
    placeItems: 'center',
}

export default function CardModal({ id, data, isOpen, setIsOpen }) {
    const currentUser = useSelector((state) => state.user.value)
    const cardRef = useRef()

    useOnClickOutside(cardRef, () => setIsOpen(false))

    return (
        <ReactModal
            id={id}
            isOpen={isOpen}
            style={{
                overlay: overlyStyle,
                content: contentStyle,
            }}>
            <div
                ref={cardRef}
                className='card rounded-4 bg-light'
                style={cardStyle}>
                <div className='card-body mt-3'>
                    <CardOptionList
                        currentUser={currentUser}
                        data={data}
                        setIsOpen={setIsOpen}
                    />
                </div>
                <div className='card-footer d-flex justify-content-between'>
                    <div className='bg-light rounded-circle' style={itemStyle}>
                        <i className='bi bi-share'></i>
                    </div>
                    <div className='bg-light rounded-circle' style={itemStyle}>
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
                    <div className='bg-light rounded-circle' style={itemStyle}>
                        <i className='bi bi-flag'></i>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}
