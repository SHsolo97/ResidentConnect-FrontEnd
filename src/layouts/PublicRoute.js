import React from 'react'
import { Redirect, Route } from 'react-router';

const PublicRoute = ({children,...routeProps}) => {
    const profile=true;
    const usertype="admin"
    
    if(profile && usertype === 'resident' )
    {
       
            return <Redirect to="/dashboardR" />
         

    }
    else if(profile && usertype === 'admin' )
    {
        return <Redirect to="/dashboardA" />
    }
    return (
        <Route {...routeProps}> {children} </Route>
    )
}

export default PublicRoute
