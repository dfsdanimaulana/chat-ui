import { useSelector } from 'react-redux'

const itemStyle = {
  width: '50px',
  height: '50px',
  display: 'grid',
  placeItems: 'center',
  color: '#fff',
  fontSize: '22px'
}

export default function CardPopup({data, id}) { 
  const currentUser = useSelector((state) => state.user.value)
  
  return (
         <div
            className='offcanvas offcanvas-md offcanvas-bottom rounded-5 rounded-bottom d-md-none bg-light'
            tabIndex={-1}
            id={'offcanvasCard' + id}
            aria-labelledby='offcanvasCardLabel'
            style={{
              minHeight: '40vh'
            }}
            >
            <div className='offcanvas-header px-4'>
                <div className="bg-info rounded-circle" style={itemStyle}>
                  <i className="bi bi-share"></i>
                </div>
                <div className="bg-info rounded-circle" style={itemStyle}>
                  <i className="bi bi-link-45deg"></i>
                </div>
                <div className="bg-info rounded-circle" style={itemStyle}>
                  <i className="bi bi-qr-code-scan"></i>
                </div>
                <div className="bg-info rounded-circle" style={itemStyle}>
                  <i className="bi bi-flag"></i>
                </div>
            </div>
            <div className='offcanvas-body'>
              <ul className="list-group list-group-flush">
                {data.user._id === currentUser._id && (
                  <li className='list-group-item bg-light'>
                    Edit post
                  </li>
                )}
                <li className='list-group-item bg-light'>
                  Add to favorites
                </li>
                <li className='list-group-item bg-light'>
                  About this account 
                </li>
                <li className='list-group-item bg-light'>
                  Unfollow 
                </li>
                {data.user._id === currentUser._id && (
                  <li className='list-group-item bg-light text-danger'>
                    Delete post
                  </li>
                )}
              </ul>
            </div>
        </div>
    )
} 