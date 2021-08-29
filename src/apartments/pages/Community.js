import React from 'react';
import {TextField,Button} from '@material-ui/core';
import { useState } from 'react';
import axios from "axios";
import { PageHeader } from '../../shared/components/PageHeader'

const COMMUNITY_DEFAULT={
     
    "name": "XYZ XYZ XYZ",
    "builder": "LightHouse ",
    "address" : {
            "addressline" : "streetname",
            "area" : "Pallavaram",
            "city": "Chennai",
            "state" : "Tamil Nadu",
            "pincode" : "600011"
    }
}
export const Community = ({children}) => {
  
    const [communityDetails,setCommunityDetails]=useState({
        name:'',
        builder:'',
        addressline:'',
        area:'',
        city:'',
        state:'',
        pincode:''
    });
    const setCommunityName = (event) => {
        setCommunityDetails((prevState)=>{
            return{...prevState,name:event.target.value}});
      };
      const setBuilderName = (event) => {
        setCommunityDetails((prevState)=>{
            return{...prevState,builder:event.target.value}});
      };
      const setAddressLine = (event) => {
        setCommunityDetails((prevState)=>{
            return{...prevState,addressline:event.target.value}});
      };
      const setArea = (event) => {
        setCommunityDetails((prevState)=>{
            return{...prevState,area:event.target.value}});
      };
      const setCity = (event) => {
        setCommunityDetails((prevState)=>{
            return{...prevState,state:event.target.value}});
      };
      const setState = (event) => {
        setCommunityDetails((prevState)=>{
            return{...prevState,state:event.target.value}});
      };
      const setPincode = (event) => {
        setCommunityDetails((prevState)=>{
            return{...prevState,pincode:event.target.value}});
      };
      const handleSubmit=(e)=>{
        var apiBaseUrl = "http://residentsconnect.dev/api/community/";
        var self = this;
        
     
        console.log(COMMUNITY_DEFAULT);   
       
        var registionsuccess = false;
        axios.post(apiBaseUrl + 'create', COMMUNITY_DEFAULT)
            .then(function (response) {
                console.log(response);
                if (response.status === 201) {
                
                    console.log("community created....");
                  


                }
                else if (response.data.code === 204) {
                    console.log("invalid data");
                    alert("invalid data")
                }
                else {
                    console.log("community  exists");
                    alert("community  exist");
                }

            })
           
            .catch(function (error) {
             
                console.log(error);
            });
        
        e.preventDefault();
        e.stopPropagation();

      }
  return (
      <>
      <PageHeader>{children}</PageHeader>
    <form  >
     
      
        <div>
            <TextField id="communityname" label="Community Name" value={communityDetails.name} onChange={setCommunityName} variant="outlined"/>
        </div>
        <div>
        <TextField id="communitybuilder" label="Builder Name" value={communityDetails.builder} onChange={setBuilderName} variant="outlined"/>
        </div>
        <div>
            <TextField id="addressline" label="Address" value={communityDetails.addressline} onChange={setAddressLine} variant="outlined"/>
            </div>
        <div>
            <TextField id="area" label="Area" value={communityDetails.area} onChange={setArea} variant="outlined"/>
            </div>
        <div>
            <TextField id="city" label="City" value={communityDetails.city} onChange={setCity} variant="outlined"/>
            </div>
        <div>
             <TextField id="state" label="State" value={communityDetails.state} onChange={setState} variant="outlined"/>
             </div>
        <div>
            <TextField id="pincode" label="Pincode" value={communityDetails.pincode} onChange={setPincode} variant="outlined"/>
            </div>
           

    </form>
    </>
    )
}

export default Community
