import React from 'react'
import { useProfile } from '../../context/profile.context'
import {Button} from '@material-ui/core';
import { PageHeader } from '../../shared/components/PageHeader';
import { useHistory } from 'react-router';
export const ProfileSelection = () => {
    const {user,isLoading,community,communityList,apartment,apartmentList}=useProfile();
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
        <div> community Id= {user.communities[0]} </div>
        <br/>
        <Button variant="contained" color="primary"  onClick={handleSubmit}> Add</Button>
       
        </div>);
}
