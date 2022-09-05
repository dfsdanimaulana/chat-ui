import Avatar from '../Avatar/Avatar'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

export default function CardPlaceholder() {
    const { width } = useWindowDimensions()
    const imgSize = (w) => {
        const size = w < 768 ? '390px' : '470px'
        return {
            height: size,
            width: '100%'
        }
    }

    return (
        <div className='card mb-3 placeholder-glow' aria-hidden='true'>
            <div className='row g-0'>
                <div className='col-md-6 border'>
                    <div
                        className='placeholder rounded col-10'
                        style={imgSize(width)}
                    ></div>
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-between'>
                    <div className='card-body d-flex flex-column'>
                        <div className='mt-2 mb-3 d-flex justify-content-between'>
                            <div className='d-flex'>
                                <Avatar width={42} placeholder='true' />
                            </div>
                        </div>
                        <p className='card-text mb-3'>
                            <span className='placeholder col-4 me-2'></span>
                            <span className='placeholder col-3 me-2'></span>
                            <span className='placeholder col-2'></span>
                            <span className='placeholder col-5'></span>
                        </p>
                        <div className='my-3 d-flex'>
                            <span className='placeholder col-2 me-2'></span>
                            <span className='placeholder col-3 me-2'></span>
                            <span className='placeholder col-2'></span>
                        </div>
                        <p className='card-text mt-auto'>
                            <small className='text-muted'>
                                <span className='placeholder col-3'></span>
                            </small>
                        </p>
                    </div>
                    <div className='card-footer d-flex justify-content-between'>
                        <div className='input-group w-75 w-md-50 my-1'>
                            <span className='placeholder placeholder-lg col-6'></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
