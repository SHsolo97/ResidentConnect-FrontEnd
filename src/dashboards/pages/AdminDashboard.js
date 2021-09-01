import React from 'react'
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader';

const AdminDashboard = () => {
    const {user}=useProfile();
    console.log(user);
    return (
        <>
         <PageHeader>Admin Dashboard</PageHeader>
         <div>id={user.id}</div>
        
        <br/>
        <div>Email={user.email}</div>
        
        <br/>
        <div>Type={user.type}</div>
        
        <br/>
        <div>uid={user.uid}</div>
        
        <br/>
        {user.communities.map((community)=>            
          <div>{community}</div>
        )}
        </>
    )
}

export default AdminDashboard
