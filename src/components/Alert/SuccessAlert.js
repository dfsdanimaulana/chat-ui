export default function SuccessAlert({ success, setSuccess }) {
    return (
        <>
            {success && (
                <div className="alert alert-success d-flex align-items-center alert-dismissible fade show my-3" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    <div>{success}</div>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setSuccess(false)}
                    ></button>
                </div>
            )}
        </>
    )
}
