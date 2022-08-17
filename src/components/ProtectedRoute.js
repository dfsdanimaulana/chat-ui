import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const isAuth = useSelector((state)=>state.auth.value)
    
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return <Component />
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
