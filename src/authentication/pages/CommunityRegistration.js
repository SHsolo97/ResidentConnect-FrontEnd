import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Paper } from '@material-ui/core'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { PageHeader } from '../../shared/components/PageHeader';
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import logo from '../../images/home/houselogo.png';
import communityAPI from '../../misc/axios-calls/communityAPI';
import notificationAPI from  '../../misc/axios-calls/notificationAPI';
import Alert from '@mui/material/Alert';
const useStyles = makeStyles((theme) => ({
  root:{
    background: 'linear-gradient(149.39deg, #007CC7 50.11%, rgba(0, 124, 199, 0) 144.08%)',
    height:"60ch",
    marginTop:'-10ch'
  },
  regBox: {
    marginTop:'30ch',

      display: 'flex',
      flexWrap: 'wrap',

width:"80ch",
height: "80ch",
padding: '1ch',

    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));

const CommunityRegistration = () => {
    const classes = useStyles();
    const history = useHistory();
    
    const [isShowAlert,setIsShowAlert]=useState(false);
    const[email,setEmail]=useState('')
    const[name,setName]=useState('')
    const[builder,setBuilder]=useState('')

  
    const sendTokentoEmail=async (email,token)=>{
    const recipient=email;
    const subject='Welcome to Residents Connect'
    const body=`Enroll to resident app (http://127.0.0.1:3000/sigin) using token id ${token}  as admin`;
    let data={
     "subject":subject,
      "body":body,
      "recipient":recipient
 }
 notificationAPI.post('/sendMail', data)
 

 .then(res => {
  setIsShowAlert(true);
 }
     )
     .catch(err=>{
         console.log(err);
        
     })
    }
    const createCommunity=async(data)=>{
      var apiBaseUrl = `/community/create`   
           
      await communityAPI.post(apiBaseUrl,data )
           .then(function (response) {
               if (response.status === 201)
              {           
                
                  console.log(response.data);
                  const community=response.data;
                  sendTokentoEmail(email,community.token);
               
              }
         
           })
           .catch(function (error) {
               console.log(error);
               return(null);
  
           });
    }
    
     
     const onSignup=()=>{  
       const data={name,builder}
       console.log(data);
       createCommunity(data);

     }
      
    
    const goToSignup=()=>{
      history.push('/registration');
    }
     
     const goToSignIn=(event)=>{
      history.push('/signin');
     }
     return (
      <div className={classes.root}>
      <Grid  container direction="column" justifyContent="space-evenly"  style={{marginLeft:"5px", marginTop:"50px"}} alignItems="center">
      <Paper elevation={1} className={classes.regBox}>

    
        <Grid  container direction="column" justifyContent="space-evenly" alignItems="center">
        <img alt="logo" src={logo}/>

        <PageHeader>Community - Sign Up</PageHeader>         
         <TextField id="email" style={{ margin: 8, width: '30ch'}}   label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined"/>
        <TextField id="name" style={{ margin: 8, width: '30ch'}}    label="Community Name" value={name} onChange={(e)=>setName(e.target.value)}  variant="outlined"/>
        <TextField id="builder" style={{ margin: 8, width: '30ch'}}    label="Community Builder" value={builder} onChange={(e)=>setBuilder(e.target.value)}  variant="outlined"/>

       
        
        

       
      
      <PrimaryButton onClick={onSignup}>Sign Up </PrimaryButton>

      <Link component="button" variant="body2" onClick={goToSignIn}> Existing User? Sign In </Link>

      </Grid>
      </Paper>
      </Grid>
      {isShowAlert && <Alert  style={{marginTop:'50px', marginLeft:'600px', width:'800px', fontWeight:'bold'}} severity="success">Your community is enrolled successfully. 
      Please use token id send it to {email} to <Link component="button"
  variant="body2"
 onClick={goToSignup}> sign up </Link> as 'administrator'</Alert>
      }
      </div>
    )
}

export default CommunityRegistration
