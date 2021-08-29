import React from 'react'
import {TextField,Button} from '@material-ui/core';
import { useState } from 'react';
import axios from "axios";
import { Label } from '@material-ui/icons';

const AdminPayments = () => {
    const [emails,setEmails]=useState(null);
    const [subject,setSubject]=useState(null);
    const [amount,setAmount]=useState(0);
    const handleSubmit=(e)=>{
     
   
      // eslint-disable-next-line no-use-before-define
     
    
      console.log(`amount : ${amount}`);
      console.log(`emails : ${emails}`); 
      console.log(`subject : ${subject}`); 
      var apiBaseUrl = "http://716504ba-default-ingressrc-d980-1401639027.ap-south-1.elb.amazonaws.com/api/payments/";
       
        
        var emaildata = {
            "amt": amount,
            "recipient": emails,
            "subject":subject
           
        }
    
        axios.post(apiBaseUrl + 'create', emaildata)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    //alert("Registration successfull.Login Again");
                    console.log("mails sent successfull....");
                  

                }
               
                else {
                    console.log("Error on email sent");
                
                }

            })
           
            .catch(function (error) {
             
                console.log(error);
            });
        
      

               
      e.preventDefault();
      e.stopPropagation();
    }

  return (
      <div>
          <h2>Admin Payments Overview</h2> 
          <form>   
    
            <div>
              
              <TextField label="emails" id="emails" value={emails}  onChange={(e)=>{setEmails(e.target.value)}} variant="outlined"/>
              </div>
              <div>
              
              <TextField label="amount" id="amount" value={amount}  onChange={(e)=>{setAmount(e.target.value)}} variant="outlined"/>
              </div>
              <div>
              
              <TextField label="subject" id="subject" value={subject}  onChange={(e)=>{setSubject(e.target.value)}} variant="outlined"/>
              </div>
             
              <Button variant="contained" color="primary"  onClick={handleSubmit}>create Payment</Button>

              </form>
      </div>
  )

}

export default AdminPayments
