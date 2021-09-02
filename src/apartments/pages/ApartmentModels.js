import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { orange } from '@material-ui/core/colors';
import {Button} from '@material-ui/core';
import {useModelState} from '../../misc/custom-hooks';
import AddEditApartmentModel from '../components/AddEditApartmentModel';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useProfile } from '../../context/profile.context';
import { useEffect } from 'react';
import axios from 'axios';
import ModelCard from '../components/ModelCard';
import { ApartmentModelsProvider } from '../../context/apartmentmodel.context';
import { ApartmentModelsSection } from '../components/ApartmentModelsSection';


export const ApartmentModels = ({children,...props}) => {
    
    const {user}= useProfile();
    const communityid=user.communities[0];
    const [apartmentModels,setApartmentModels]=React.useState([]);

    

    const getApartmentModels=async()=>{
        var apiBaseUrl = `http://localhost:4000/api/community/${communityid}/apartments/models`   
        await axios.get(apiBaseUrl )
             .then(function (response) {
                 if (response.status === 200)

                {
                    console.log (response.data.models);
                    setApartmentModels(response.data.models)
                   
                  
                }
             })
             .catch(function (error) {
                 console.log(error);
                 return null;
                  
             });
    }
  
  
    useEffect(()=>{
        getApartmentModels();
        
        
    },[])
  
    const handleSubmit=(e)=>{
        props.handleNext();
    }
    const handleBack=(e)=>{
        props.handleBack();
    }
    return (
        <>
         
          <PageHeader>{children}</PageHeader> 
          <ApartmentModelsProvider data={apartmentModels}>
              <ApartmentModelsSection /> 
            </ApartmentModelsProvider>
          <PrimaryButton    onClick={handleBack}> Back </PrimaryButton>
           <PrimaryButton  onClick={handleSubmit}> Next </PrimaryButton>
         

        </>
    )
}
