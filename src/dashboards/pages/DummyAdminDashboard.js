import React from 'react'
import { useHistory } from 'react-router-dom';
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader';
import PrimaryButton from '../../shared/components/PrimaryButton';

const DummyAdminDashboard = () => {
    const history=useHistory();
    const {user}=useProfile();

    const {communityList}=useCommunity();
    console.log(user);
    const gotoDashboard=()=>{
        history.push('/DashboardOA');
    }
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
<PrimaryButton onClick={gotoDashboard}>Go To Dashboard</PrimaryButton>
</>
    )
}

export default DummyAdminDashboard
