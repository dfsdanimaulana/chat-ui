import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import Nav from '../../components/Navbar/Nav'
import Navbar from '../../components/Navbar/Navbar'
import ChangeProfilePicture from './ChangeProfilePicture'
import SettingLink from './SettingLink'

export default function Setting() {
    const { path } = useRouteMatch()
    const currentUser = useSelector((state) => state.user.value)
    const { width } = useWindowDimensions()

    return (
        <>
            {width < 768 ? <Nav title="Setting" /> : <Navbar />}
            <div className="container mb-5">
                <div className="row mt-md-3">
                    <div className="col-md-4 border d-none d-md-block">
                        <SettingLink />
                    </div>
                    <div className="col-md-8 border p-md-3">
                        <Switch>
                            <Route exact path={path}>
                                <EditProfile currentUser={currentUser} />
                            </Route>
                            <Route path={`${path}/change_password`}>
                                <ChangePassword currentUser={currentUser} />
                            </Route>
                            <Route path={`${path}/change_profile_picture`}>
                                <ChangeProfilePicture currentUser={currentUser} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}
