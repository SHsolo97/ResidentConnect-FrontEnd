import React from 'react'
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader';

const AdminDashboard = () => {
    const {user}=useProfile();
    const {communityList}=useCommunity();
    console.log(user);
    return (
        <>
         <PageHeader>Admin Dashboard</PageHeader>
         <div>id={user._id}</div>
        
        <br/>
        <div>Email={user.email}</div>
        
        <br/>
        <div>Type={user.type}</div>
        
        <br/>
        <div>uid={user.uid}</div>
        
        <br/>
      
       { communityList.map((community)=>           
                    <>
                   <h2> Community  Details</h2>
                    <div> community id: {community.id}</div>
                    <br/>
                    <div> community name: {community.name}</div>
                    <br/>
                    <div> community Builder: {community.builder}</div>

                    <br/>
                    </>)        
}
</>
    )
}

export default AdminDashboard
