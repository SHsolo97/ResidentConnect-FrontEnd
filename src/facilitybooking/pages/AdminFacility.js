import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { orange } from '@material-ui/core/colors'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {TextField,Button} from '@material-ui/core';
import { useHistory } from 'react-router';
const AdminFacility = () => {
    const history=useHistory();
    const goToAddFacility=()=>{
        history.push('/addFacility');
    }
    return (
        <>
           <PageHeader> Facility Overview </PageHeader>
           <Button
        variant="contained"
        style ={{backgroundColor: orange[500] }}
        startIcon={<AddCircleOutlineIcon />} onClick={goToAddFacility}>Add Facility</Button>
        </>
    )
}

export default AdminFacility
