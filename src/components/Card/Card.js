import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function Card() {
    const { width } = useWindowDimensions()

    const handleImageClass = (w) => {
        return `d-block w-100 ${w >= 768 ? 'rounded-start' : 'rounded-top'}`
    }

    return (
        <div className='card mb-3'>
            <div className='row g-0'>
                <div className='col-md-6'>
                    {/* <img
                        src='https://picsum.photos/400'
                        className='img-fluid w-100 h-100'
                        alt='...'
                    /> */}

                    {/* for image more than one */}
                    <div
                        id='carouselExampleIndicators'
                        className='carousel slide'
                        data-bs-ride='true'>
                        <div className='carousel-indicators'>
                            <button
                                type='button'
                                data-bs-target='#carouselExampleIndicators'
                                data-bs-slide-to={0}
                                className='active'
                                aria-current='true'
                                aria-label='Slide 1'
                            />
                            <button
                                type='button'
                                data-bs-target='#carouselExampleIndicators'
                                data-bs-slide-to={1}
                                aria-label='Slide 2'
                            />
                            <button
                                type='button'
                                data-bs-target='#carouselExampleIndicators'
                                data-bs-slide-to={2}
                                aria-label='Slide 3'
                            />
                        </div>
                        <div className='carousel-inner'>
                            <div className='carousel-item active'>
                                <img
                                    src='https://picsum.photos/400'
                                    className={handleImageClass(width)}
                                    alt='...'
                                />
                            </div>
                            <div className='carousel-item'>
                                <img
                                    src='https://picsum.photos/400'
                                    className={handleImageClass(width)}
                                    alt='...'
                                />
                            </div>
                            <div className='carousel-item'>
                                <img
                                    src='https://picsum.photos/400'
                                    className={handleImageClass(width)}
                                    alt='...'
                                />
                            </div>
                        </div>
                        <button
                            className='carousel-control-prev'
                            type='button'
                            data-bs-target='#carouselExampleIndicators'
                            data-bs-slide='prev'>
                            <span
                                className='carousel-control-prev-icon'
                                aria-hidden='true'
                            />
                            <span className='visually-hidden'>Previous</span>
                        </button>
                        <button
                            className='carousel-control-next'
                            type='button'
                            data-bs-target='#carouselExampleIndicators'
                            data-bs-slide='next'>
                            <span
                                className='carousel-control-next-icon'
                                aria-hidden='true'
                            />
                            <span className='visually-hidden'>Next</span>
                        </button>
                    </div>
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-between'>
                    <div className='card-body d-flex flex-column'>
                        <div className='mt-2 mb-3 d-flex justify-content-between'>
                            <div>
                                <img
                                    src='https://picsum.photos/32'
                                    className='img-thumbnail rounded-circle'
                                    alt='...'></img>
                                <span className='card-title fs-6 fw-bold ms-2 text-secondary'>
                                    Name
                                </span>
                            </div>
                            <div className='fs-6'>
                                <i className='bi bi-bookmark'></i>
                                <i className='bi bi-three-dots-vertical ms-3'></i>
                            </div>
                        </div>
                        <p className='card-text'>
                            {width} This is a wider card with supporting text
                            below as a natural lead-in to additional content.
                            This content is a little bit longer.
                        </p>
                        <p className='card-text mt-auto'>
                            <small className='text-muted'>
                                Last updated 3 mins ago
                            </small>
                        </p>
                    </div>
                    <div className='card-footer d-flex justify-content-between'>
                        <div className='input-group w-75 w-md-50'>
                            <span className='input-group-text'>
                                <i className='bi bi-emoji-smile'></i>
                            </span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Add a comment...'
                                aria-label="Recipient's username"
                                aria-describedby='basic-addon2'
                            />
                            <span className='input-group-text'>
                                <i className='bi bi-send'></i>
                            </span>
                        </div>
                        <div className='d-flex justify-content-around align-items-center text-secondary fw-bold'>
                            <span className='fw-lighter text-secondary ms-3'>
                                50
                            </span>
                            <i className='bi bi-chat-left-dots ms-2'></i>
                            <span className='fw-lighter text-secondary ms-3'>
                                200
                            </span>
                            <i className='bi bi-heart ms-2'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
