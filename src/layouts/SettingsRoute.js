import React from 'react'
import { Redirect,Route} from 'react-router-dom';
import { useProfile } from '../context/profile.context';
import { SettingsLayout } from './SettingsLayout';

const SettingsRoute = ({ component: Component, ...rest }) => {
    const {user}=useProfile();

    if(!user)
    {
        return <Redirect to="/signin" />
    }
     return (
        <Route {...rest} render={matchProps => (
                    <SettingsLayout>
                <Component {...matchProps} />
                </SettingsLayout>
           
        )} />
    )
};
export default SettingsRoute
