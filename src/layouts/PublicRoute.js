import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';
import CircularProgress from '@material-ui/core/CircularProgress';

const PublicRoute = ({children,...routeProps}) => {
    const {user,isLoading}=useProfile();
   
    if(isLoading && !user)
    {
        return <CircularProgress variant="indeterminate"/>
    }
  
    if(user &&  !isLoading  )
    {
        const userType=user.type

        if(userType === 'resident')
        {
            if(user.profilecompletion)
                return <Redirect to="/dashboardR" />
            else
                 return <Redirect to="/selectprofile" />
        }
        else
        {
            if(user.profilecompletion)
                return <Redirect to="/dashboardA" />
            else
                return <Redirect to="/selectprofile" />
        }   
    }
   
    return (
        <Route {...routeProps}> {children} </Route>
    )
}

export default PublicRoute
