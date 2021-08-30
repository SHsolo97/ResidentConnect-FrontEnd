import React from 'react'
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader';

const AdminDashboard = () => {
    const {profile}=useProfile();
    console.log(profile);
    return (
        <>
         <PageHeader>Admin Dashboard</PageHeader>
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

export default AdminDashboard
