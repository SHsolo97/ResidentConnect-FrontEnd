import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';
import CircularProgress from '@material-ui/core/CircularProgress';

const PublicRoute = ({children,...routeProps}) => {
    const {profile,isLoading}=useProfile();
   
    if(isLoading && !profile)
    {
        return <CircularProgress variant="indeterminate"/>
    }
  
    if(profile &&  !isLoading  )
    {
        const userType=profile.type
        if(userType === 'resident')
        {
            if(profile.profilecompletion)
                return <Redirect to="/dashboardR" />
            else
                 return <Redirect to="/settingsR" />
        }
        else
        {
            if(profile.profilecompletion)
                return <Redirect to="/dashboardA" />
            else
                return <Redirect to="/settingsA" />
        }   
    }
   
    return (
        <Route {...routeProps}> {children} </Route>
    )
}

export default PublicRoute
