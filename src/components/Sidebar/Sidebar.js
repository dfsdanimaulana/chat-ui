import { SettingLink } from '../../pages/Setting/Setting'

export default function Sidebar() {
    return (
        <div
            className='offcanvas offcanvas-md offcanvas-bottom rounded-bottom rounded-5 d-md-none'
            tabIndex={-1}
            id='offcanvasRight'
            aria-labelledby='offcanvasRightLabel'
            style={{
              minHeight: '50vh'
            }}
            >
            <div className='offcanvas-header px-4'>
                <h5 className='offcanvas-title' id='offcanvasRightLabel'>
                    Settings
                </h5>
                <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='offcanvas'
                    aria-label='Close'
                />
            </div>
            <div className='offcanvas-body'>
              <SettingLink />
            </div>
        </div>
    )
}
