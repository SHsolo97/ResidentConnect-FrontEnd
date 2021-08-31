import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader';
import { useProfile } from '../../context/profile.context'

const ResidentDashboard = () => {
    const {user}=useProfile();
    console.log(user);
    return (
        <>
         <PageHeader>Resident Dashboard</PageHeader>
         <div>id={user.id}</div>
        
        <br/>
        <div>Email={user.email}</div>
        
        <br/>
        <div>Type={user.type}</div>
        
        <br/>
        <div>uid={user.uid}</div>
        
        <br/>
        </>
    )
}

export default ResidentDashboard
