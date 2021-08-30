import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { orange } from '@material-ui/core/colors';
import {Button} from '@material-ui/core';
import {useModelState} from '../../misc/custom-hooks';
import AddApartmentModal from '../components/AddApartmentModel';

export const ApartmentModels = ({children}) => {
    const { isOpen, open, close } = useModelState();
  
    return (
        <>
          <PageHeader>{children}</PageHeader>  
          <Button   variant="contained" style ={{backgroundColor: orange[500] }} 
               startIcon={<AddCircleOutlineIcon />} onClick={open}>Add Model</Button>
                     {isOpen && <AddApartmentModal handleClose={close} open={open} />}

        </>
    )
}
