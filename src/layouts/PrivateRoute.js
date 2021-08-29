import React ,{ Component }from 'react'
import { Route } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';
import { Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const profile=true;
    const usertype="admin"
    if(!profile)
    {
        return <Redirect to="/signin" />
    }
     return (
        <Route {...rest} render={matchProps => (
            <PrivateLayout usertype={usertype}>
                <Component {...matchProps} />
            </PrivateLayout>
        )} />
    )
};


export default PrivateRoute
