import React from 'react';
import {TextField,Button} from '@material-ui/core';
import { useState } from 'react';



 const CreateContact = () => {

    const [communityid,setCommunityId]=useState(null);
    const [contact,setContact]=useState({
        type:'',
        name:'',
        phone:
        [
           {
               type :"office",
               number: "830-340-3003",
               hours:"12 AM to 12 AM IST"
            }
           
        ],
        emails:["rter@gmail.com"],
      
        address: {
        addressline: "streetname",
        area: "Perungudi",
        city: "Chennai",
    state: "Tamil Nadu",
        pincode: "602001"
}
        
    });
    const setContactType = (event) => {
        setContact((prevState)=>{
            return{...prevState,type:event.target.value}});
      };

      const setContactName = (event) => {
        setContact((prevState)=>{
            return{...prevState,name:event.target.value}});
      };
      const handleSubmit=(e)=>{
       
     
        //console.log(communityid);   
        //console.log(contact);   
       
       
        e.preventDefault();
        e.stopPropagation();
      }
    return (
        <div>
            <h2>Admin Contacts Overview</h2> 
            <form>   
      
              <div>
                <TextField id="communityid" value={communityid}  onChange={(e)=>{setCommunityId(e.target.value)}} variant="outlined"/>
                </div>
                <div>
                <TextField id="contacttype" value={contact.type}  onChange={setContactType} variant="outlined"/>
                </div>
                <div>
                <TextField id="contactname" value={contact.name}  onChange={setContactName} variant="outlined"/>
                </div>
                <Button variant="contained" color="primary"  onClick={handleSubmit}> Add</Button>

                </form>
        </div>
    )
    }
    export default CreateContact