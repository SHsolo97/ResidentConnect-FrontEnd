import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader';
import { useProfile } from '../../context/profile.context'

const ResidentDashboard = () => {
    const {user}=useProfile();
    console.log(user);
    return (
        <>
         <PageHeader>Resident Dashboard</PageHeader>
         <div>user id={user.id}</div>
        
        <br/>
        <div>Email={user.email}</div>
        
        <br/>
        <div>Type={user.type}</div>
        
        <br/>
        <div>uid={user.uid}</div>
        <br/>
        {user.communities.map((community)=>            
         <> <div>community id: {community}</div>
           <br/>
           </>
        )}
        <br/>
        {user.apartments.map((apartment)=>            
         <> <div>apartment id: {apartment.apartmentid}</div>
           <br/>
           </>
        )}
    
        </>
    )
}

export default ResidentDashboard
