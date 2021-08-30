import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';

const SettingsRoute = ({ component: Component, ...rest }) => {
    const profile=useProfile();

    if(!profile)
    {
        return <Redirect to="/signin" />
    }
     return (
        <Route {...rest} render={matchProps => (
          
                <Component {...matchProps} />
           
        )} />
    )
};
export default SettingsRoute
