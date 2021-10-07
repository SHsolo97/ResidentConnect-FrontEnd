/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Button} from '@material-ui/core';
import { useState,useEffect } from 'react';
import ContactCard from '../components/ContactCard';
import { PageHeader } from '../../shared/components/PageHeader';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { orange } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { useCommunity } from '../../context/community.context';
import contactsAPI from '../../misc/axios-calls/contactsAPI';

const ResidentContacts = () => {
    const [contacts,setContacts]=useState([]);
    const history = useHistory();
   
    const {community}=useCommunity();
    const communityid=community._id;
   
    const getContactdetails=async ()=>{ 
     
   
      // eslint-disable-next-line no-use-before-define
     
    
      //console.log(`communityid : ${communityid}`);

      var apiBaseUrl = "/contacts/";
       
        
        var data = {
            "communityid": communityid          
        }
        let contactslist=[];
        await contactsAPI.post(apiBaseUrl, data )
            .then(function (response) {
                if (response.status === 200) {
                   
                    contactslist=response.data.contacts;
             
                    
                    setContacts(contactslist);

                }
               
                else {
                    console.log("Error on contacts retrieval");
                
                }

            })
           
            .catch(function (error) {
             
                console.log(error);
            });
          }
          
          useEffect(() => {
            getContactdetails();
         
        }, [])
    const createContactHandler=()=>{
        history.push('CreateContact');
    }
    return (
        <div>
           <PageHeader>Contact Details</PageHeader>
         
            { contacts.map(contact=>(
                   <div>
                         <ContactCard contactdetails={contact} />
                   </div>
            ))}
            
        </div>
    )
}

export default ResidentContacts
