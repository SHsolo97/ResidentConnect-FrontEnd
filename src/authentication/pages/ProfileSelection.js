import React from 'react'
import { useProfile } from '../../context/profile.context'
import {Button} from '@material-ui/core';
import { PageHeader } from '../../shared/components/PageHeader';
import { useHistory } from 'react-router';
import { useCommunity } from '../../context/community.context';
import { useApartment } from '../../context/apartment.context';
export const ProfileSelection = () => {
    const {user,isLoading}=useProfile();
    const {community,communityList} = useCommunity();
    const {apartment,apartmentList} = useApartment();
    console.log(community);
    console.log(communityList);
    console.log(apartment);
    console.log(apartmentList);
    const history=useHistory();
    const handleSubmit=()=>{
        if(user.type==='admin')
          history.push('/dashboardA');
        else
         history.push('/dashboardR');

    }
    
    return (
        <div>
            <PageHeader> Select Profile </PageHeader>
            { (user.type==='admin')
                ? communityList.map((community)=>            
                    <>
                   <h2> Community  Details</h2>
                    <div> community id: {community.id}</div>
                    <br/>
                    <div> community name: {community.name}</div>
                    <br/>
                    <div> community Builder: {community.builder}</div>

                    <br/>
                    </>)
                :
                apartmentList.map((apartment)=>            
                    <>
                    <h2> Apartment Details</h2>
                    <div>community id: {apartment.communityid}</div>
                    <br/>
                   
                    <div>apartment id: {apartment.id}</div>
                    <br/>
                    </>)
            }

        
       
        <Button variant="contained" color="primary"  onClick={handleSubmit}> Add</Button>
       
        </div>);
}
