import React ,{ Component }from 'react'
import { Route } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';
import { Redirect } from 'react-router';
import { useProfile } from '../context/profile.context';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const {user,isLoading}=useProfile();
    if(isLoading && !user)
    {
        return <CircularProgress variant="indeterminate"/>
    }
    if(!user && !isLoading)
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
