import { Route, Redirect } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

const ProtectedRoute = ({ children, ...rest }) => {
    const { user } = useUser()

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
