import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ children, ...rest }) => {
    const isAuth = useSelector((state) => state.auth.value)

    // cek jwt in cookie
    if (!isAuth) {
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return children
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            }}
        />
    )
}
export default ProtectedRoute
