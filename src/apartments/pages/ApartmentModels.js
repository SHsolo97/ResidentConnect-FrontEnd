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


export const ApartmentModels = ({children,...props}) => {
    const { isOpen, open, close } = useModelState();
    const {user}=useProfile();
    const communityid=user.communities[0];
    const [models,setModels]=React.useState([]);
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
    const addApartmentModel=async(model)=>{
        var apiBaseUrl = `http://localhost:4000/api/community/apartments/models/create`  
        console.log(model);
        await axios.post(apiBaseUrl,model )
             .then(function (response) {
                 if (response.status === 201)

                {
                    console.log(response.data);
                    setModels([...models, response.data.model]);
                    
              
                   
                  
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    } 
    const getApartmentModels=async()=>{
        var apiBaseUrl = `http://localhost:4000/api/community/${communityid}/apartments/models`   
        await axios.get(apiBaseUrl )
             .then(function (response) {
                 if (response.status === 200)

                {
                    console.log(response.data.models);
                     setModels(response.data.models);
                   
                  
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    }
    const editApartmentModel=async(modelToBeEdit)=>{
        var apiBaseUrl = `http://localhost:4000/api/community/apartments/models/${modelToBeEdit._id}`  
        await axios.put(apiBaseUrl,modelToBeEdit )
             .then(function (response) {
                 if (response.status === 200)

                {
                    console.log(response.data);
                    setModels((models) => models.map((model) => 
                    {
                        if(model._id === modelToBeEdit._id)
                        {
                            return response.data;
                        }
                        else
                        
                        {
                            return model;
                        }
                    }
                    ));
                    
              
                   
                  
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    } 

    const deleteModel= async (modelToBeDelete)=>
    {
     console.log(`delete ${modelToBeDelete._id}`);
    var apiBaseUrl = `http://localhost:4000/api/community/apartments/models/${modelToBeDelete._id}`  
      await axios.delete(apiBaseUrl )
          .then(function (response) {
            if (response.status === 200)            
           {
               console.log(response.data);
              
               setModels((models) => models.filter((model) => model._id !== modelToBeDelete._id));
              

           }
        })
        .catch(function (error) {
            console.log(error);
             
        });
  
     }
    useEffect(() => {
        getApartmentModels();
    }, [])
 
   
    const handleSubmit=(e)=>{
        props.handleNext();
    }
    const handleBack=(e)=>{
        props.handleBack();
    }
    return (
        <>
          <PageHeader>{children}</PageHeader>  
          <Button   variant="contained" style ={{backgroundColor: orange[500] }} 
               startIcon={<AddCircleOutlineIcon />} onClick={open}>Add Model</Button>
                     {isOpen && <AddEditApartmentModel  actionType="add" model={INTIAIL_VALUE} addApartmentModel={addApartmentModel} handleClose={close} open={open} />}
                     {models.map((model)=> 
                     
                     <ModelCard editApartmentModel={editApartmentModel} deleteModel={deleteModel} model={model}/>
                     )}
                     <PrimaryButton    onClick={handleBack}> Back </PrimaryButton>
                      <PrimaryButton  onClick={handleSubmit}> Next </PrimaryButton>

        </>
    )
}
