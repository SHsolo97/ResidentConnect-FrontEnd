import React from 'react'
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";
import {PrimaryButton}from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { TextField, Typography } from '@mui/material';
import communityAPI from '../../misc/axios-calls/communityAPI';
import { useProfile } from '../../context/profile.context';
import userAPI from '../../misc/axios-calls/userAPI';

export const RegisterApartmentModel = ({...props}) => {
    const[tokenValue,setTokenValue]=React.useState(null);    
    const {user,setUser}=useProfile();
    const addApartment=async (apartment)=>{
   
        const data={
            "communityid": apartment.communityid,
             "apartmentid": apartment._id
        }
        const apiBaseUrl=`/users/${user._id}/apartment/add`;
        await userAPI.patch(apiBaseUrl,data )
        .then(function (response) {
            if (response.status === 200) {           
              
                
                   const userdata= response.data;
                   console.log(userdata);
                   setUser(userdata);
                    props.handleClose();
                   
            }
            else if (response.status === 404) {
              
                return null;
                
            }
        })
        .catch(function (error) {
            console.log(error);
            return null;
           
        });
      
  }

    const validateToken=async (token)=>{
   
    
        const apiBaseUrl=`/community/apartments/validatetoken/${token}`;
        await communityAPI.get(apiBaseUrl )
        .then(function (response) {
            if (response.status === 200) {           
              
                  //add Aparment
                   const apartmentdata= response.data;
                  
                   addApartment(apartmentdata);
            }
            else if (response.status === 404) {
                console.log("Token invalid");
                return null;
                
            }
        })
        .catch(function (error) {
            console.log(error);
            return null;
           
        });
      
  }
   const handleSubmit=()=>
        {
            console.log(tokenValue);
            validateToken(tokenValue)
           
                
              
                
            
        }
        return (
            <Dialog style={{ width: "100ch" }} open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">
                <SectionHeader> Add Apartment </SectionHeader>
              </DialogTitle>
              <DialogContent>
                        <Typography> Provide token id of the apartment </Typography>
                      <TextField name="token"  value={tokenValue} onChange={(e)=>{setTokenValue(e.target.value)}} variant="outlined" />
                  
                      <Grid container direction="row" justifyContent="space-around" alignItems="center">
                             <PrimaryButton  onClick={handleSubmit}>Submit</PrimaryButton>
                      <PrimaryButton onClick={props.handleClose}> Cancel </PrimaryButton>
                    </Grid>
                  </DialogContent>

            </Dialog>
          );
}
