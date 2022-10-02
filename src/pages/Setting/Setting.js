import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'

// components
import SettingLink from './SettingLink'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import ChangeProfilePicture from './ChangeProfilePicture'

export default function Setting() {
    const { path } = useRouteMatch()
    const { user } = useUser()

    return (
            <div className="container mb-5 bg-white">
                <div className="row mt-md-3">
                    <div className="col-md-4 border d-none d-md-block">
                        <SettingLink />
                    </div>
                    <div className="col-md-8 border p-md-3">
                        <Switch>
                            <Route exact path={path}>
                                <EditProfile user={user} />
                            </Route>
                            <Route path={`${path}/change_password`}>
                                <ChangePassword user={user} />
                            </Route>
                            <Route path={`${path}/change_profile_picture`}>
                                <ChangeProfilePicture user={user} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
       
    )
}
