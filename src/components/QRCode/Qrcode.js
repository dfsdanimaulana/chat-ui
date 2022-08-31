import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Qrcode() {
    const [qr, setQr] = useState('')
    const [error, setError] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        QRCode.toDataURL(
            id,
            {
                width: 400,
                margin: 2,
            },
            (err, url) => {
                if (err) {
                    setError(true)
                    return
                }
                setQr(url)
            }
        )
    }, [id])

    return (
        <div className='container d-flex justify-content-center align-item-center'>
            <div className='card'>
                {qr && (
                    <>
                        <img
                            src={qr}
                            alt='...'
                            className='card-img-top'
                            style={{
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                            }}
                        />
                        <div className='card-body text-center'>
                            <button className='btn btn-outline-info'>
                                Download
                            </button>
                        </div>
                    </>
                )}
                {error && <div className='my-5'>Failed to generate QRCode</div>}
            </div>
        </div>
    )
}
