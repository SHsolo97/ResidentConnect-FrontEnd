import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader';
import { useProfile } from '../../context/profile.context'
import { useApartment } from '../../context/apartment.context';
import { Divider } from '@mui/material';
import { useCommunity } from '../../context/community.context';
import { useHistory } from 'react-router-dom';
import {PrimaryButton}from '../../shared/components/PrimaryButton';

const DummyResidentDashboard = () => {
    const history=useHistory();
    const {user}=useProfile();
    const {community} = useCommunity();
    const gotoDashboard=()=>{
        history.push('/DashboardOR');
    }
  const {apartment} = useApartment();
    return (
        <>
         <PageHeader>Resident Dashboard</PageHeader>
         <div>user id={user._id}</div>
        
        <br/>
        <div>Email={user.email}</div>
        
        <br/>
        <div>Type={user.type}</div>
        
        <br/>
        <div>uid={user.uid}</div>
        <br/>
   
        {user.apartments.map((apartment)=>            
         <> <div>community id: {apartment.communityid}</div>
            <div>apartment id: {apartment.apartmentid}</div>
           <br/>
           </>
        )}
        <Divider/>
         <div>Current community id: {community._id}</div>
          <div>Current apartment id: {apartment._id}</div>
           <br/>
           <PrimaryButton onClick={gotoDashboard}>Go To Dashboard</PrimaryButton>

        </>
    )
}

export default DummyResidentDashboard
