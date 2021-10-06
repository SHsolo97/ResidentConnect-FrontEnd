/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Button} from '@material-ui/core';
import { useState,useEffect } from 'react';
import axios from "axios";
import ContactCard from '../components/ContactCard';
import { PageHeader } from '../../shared/components/PageHeader';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { orange } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { useCommunity } from '../../context/community.context';

const AdminContacts = () => {
    const [contacts,setContacts]=useState([]);
    const history = useHistory();
   
    const community=useCommunity();
    const communityid=community._id;
   useEffect( function effectfunction() { async function getcontactdetails(){ 
     
   
      // eslint-disable-next-line no-use-before-define
     
    
      console.log(`communityid : ${communityid}`);
     
      var apiBaseUrl = "http://localhost:4001/api/contacts/";
       
        
        var data = {
            "communityid": communityid          
        }
        let contactslist=[];
        await axios.post(apiBaseUrl, data )
            .then(function (response) {
                if (response.status === 200) {
                    //alert("Registration successfull.Login Again");
                    //console.log(response.data.contacts);
                    
                    contactslist=response.data.contacts;
                    console.log(contactslist);
                    
                    setContacts(contactslist);
                    console.log(`contacts: ${contacts}`);

                }
               
                else {
                    console.log("Error on contacts retrieval");
                
                }

            })
           
            .catch(function (error) {
             
                console.log(error);
            });
          }
          getcontactdetails();

               
     
    },[communityid]);
    const createContactHandler=()=>{
        history.push('CreateContact');
    }
    return (
        <div>
           <PageHeader>Contact Details</PageHeader>
           <Button
        variant="contained"
        style ={{backgroundColor: orange[500] }}
        startIcon={<AddCircleOutlineIcon />} onClick={createContactHandler}>Add Contact</Button>
            { contacts.map(contact=>(
                   <div>
                         <ContactCard contactdetails={contact} />
                   </div>
            ))}
            
        </div>
    )
}

export default AdminContacts
