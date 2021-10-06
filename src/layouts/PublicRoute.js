import React from 'react'
import { Redirect,Route  } from 'react-router-dom';
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
          
                 return <Redirect to="/selectprofile" />
        }
        else
        {
           
                return <Redirect to="/selectprofile" />
        }   
    }
   
    return (
        <Route {...routeProps}> {children} </Route>
    )
}

export default PublicRoute
