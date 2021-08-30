import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader';
import { useProfile } from '../../context/profile.context'

const ResidentDashboard = () => {
    const {profile}=useProfile();
    console.log(profile);
    return (
        <>
         <PageHeader>Resident Dashboard</PageHeader>
         <div>id={profile.id}</div>
        
        <br/>
        <div>Email={profile.email}</div>
        
        <br/>
        <div>Type={profile.type}</div>
        
        <br/>
        <div>uid={profile.uid}</div>
        
        <br/>
        </>
    )
}

export default ResidentDashboard
