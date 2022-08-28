export default function ErrorAlert ({ error, setError }) {
  return (
    <>
      {error && (
          <div
              className='alert alert-danger d-flex align-items-center alert-dismissible fade show my-3'
              role='alert'>
              <i className='bi bi-radioactive me-2'></i>
              <div>{error}</div>
              <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='alert'
                  aria-label='Close'
                  onClick={() => setError(false)}></button>
          </div>
      )}
    </>
  )
}