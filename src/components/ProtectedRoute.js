import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children, ...rest }) => {
    const { user } = useAuth()

    return (
        <Route
            {...rest}
            render={(props) => {
                if (user) {
                    return children
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            }}
        />
    )
}
export default ProtectedRoute
