import React from 'react'
import {TextField,Button} from '@material-ui/core';

import { PageHeader } from '../../shared/components/PageHeader'
import { useHistory } from 'react-router'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { orange } from '@material-ui/core/colors'
const Classifieds = () => {
    const history=useHistory();
    const goToClassified=()=>
    {
        history.push('/addclassified');
    }
    return (
        <>
         <PageHeader>Classfieds</PageHeader>
         <Button
        variant="contained"
        style ={{backgroundColor: orange[500] }}
        startIcon={<AddCircleOutlineIcon />} onClick={goToClassified}>Add Classified</Button>
        </>
    )
}

export default Classifieds
