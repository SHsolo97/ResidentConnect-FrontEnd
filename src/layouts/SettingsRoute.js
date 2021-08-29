import React from 'react'
import { Redirect, Route } from 'react-router';

const SettingsRoute = ({ component: Component, ...rest }) => {
    const profile=true;
    const usertype="admin"
    
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
