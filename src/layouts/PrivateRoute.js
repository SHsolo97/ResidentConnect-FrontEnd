import React ,{ Component }from 'react'
import { Route } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';
import { Redirect } from 'react-router';
import { useProfile } from '../context/profile.context';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const {profile,isLoading}=useProfile();
    if(isLoading && !profile)
    {
        return <CircularProgress variant="indeterminate"/>
    }
    if(!profile && !isLoading)
    {
        return <Redirect to="/signin" />
    }
     return (
        <Route {...rest} render={matchProps => (
            <PrivateLayout>
                <Component {...matchProps} />
            </PrivateLayout>
        )} />
    )
};


export default PrivateRoute
