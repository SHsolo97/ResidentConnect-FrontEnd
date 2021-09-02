import React from 'react'
import { Button } from '@material-ui/core'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import ModelCard from './ModelCard';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useApartmentModel } from '../../context/apartmentmodel.context';
import axios from 'axios';
import AddEditApartmentModel from './AddEditApartmentModel';
import { useModelState } from '../../misc/custom-hooks';
import { orange } from '@material-ui/core/colors';
import { useProfile } from '../../context/profile.context';
import { useEffect } from 'react';

export const ApartmentModelsSection = () => {
    const { isOpen, open, close } = useModelState();
    const {data}=useApartmentModel();

    const {user}=useProfile();
    const communityid=user.communities[0];

    const INTIAIL_VALUE={
        communityid:communityid,
        name: '',
        area:{
          carpetarea:0,
          builduparea:0,
          superbuilduparea:0
        },
        rooms : {
          bedrooms: 0,
          bathrooms :0,
          balconies: 0,
          kitchens : 0,
          halls :0,
          otherrooms:0
      }
    }
 
 
   

    return (
       <>
        <Button   variant="contained" style ={{backgroundColor: orange[500] }} 
               startIcon={<AddCircleOutline />} onClick={open}>Add Model</Button>
                     {isOpen && <AddEditApartmentModel  model={INTIAIL_VALUE} actionType="add" handleClose={close} open={open} />}
                     {data.map((model)=> 
                     
                     <ModelCard   model={model}/>
                     )}
                   
        </>
    )
}
