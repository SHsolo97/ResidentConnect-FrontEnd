import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, OutlinedInput, Grid, TextField } from '@material-ui/core'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import firebase from 'firebase/app';
import { auth,database } from '../../misc/firebase';
import Link from '@material-ui/core/Link';
import {Redirect} from 'react-router-dom';
import { PageHeader } from '../../shared/components/PageHeader';
import { ControlCameraOutlined } from '@material-ui/icons';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));

const Registration = () => {
    const classes = useStyles();
    const history = useHistory();
    const[token,setToken]=useState(null);
    
    let apartment=null;

    let community=null
    let uid=null;
    const[userInfo,setUserInfo]=useState(
        {
            type:'',
         
            email:''
        }
    );
    const [password, setPassword] = useState({
        password: "",
        showPassword: false,
      });
      
      const handleClickShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
      };
      
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
      const validateToken=async ()=>{
        var apiBaseUrl = null;
        if(userInfo.type==='admin')
             apiBaseUrl=`http://localhost:4000/api/community/validatetoken/${token}`;
        else
            apiBaseUrl=`http://localhost:4000/api/community/apartments/validatetoken/${token}`;
       await axios.get(apiBaseUrl )
            .then(function (response) {
                if (response.status === 200) {           
                    if(userInfo.type==='admin')                    
                    { 
                      console.log("save community details");
                      console.log(response.data);
                      community=response.data; 
                        console.log(community);
                        
                        return true;
                    }
                    else if(userInfo.type==='resident') 
                    {
                        console.log("save apartment details");
                      console.log(response.data);
                      apartment=response.data; 
                        console.log(apartment);
                        return true;
                    }
                }
                else if (response.status === 404) {
                    console.log("Token invalid");
                    return false;
                }
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
            return false;
          
      }
      const handlePasswordChange = (prop) => (event) => {
        setPassword({ ...password, [prop]: event.target.value });
      };
      const onSignUpWithProvider =  async provider => {
        
         try {
             const result= await auth.signInWithPopup(provider);
             console.log(result);           
         }
         catch (err) {
            console.log(err);
        }
     }
     const registerUserwithEmailAndPassword=()=>{
         console.log('Register email in Firebase....');
        auth.createUserWithEmailAndPassword(userInfo.email,password.password)
        .then((userCredential) => {
         
        const user = userCredential.user;
        console.log(user);
        console.log(uid);

        uid=user.uid;
            createUser();  
             }
        )
             
        .catch((error) => {
            console.log(error)
        
        });
     }
     const createUser=async ()=>{
        console.log('create userInfo Record...');
        console.log(community);
        var apiBaseUrl = `http://localhost:4002/api/users/create`;
        let userData=null;
        if(userInfo.type==='admin')
        {
            userData={
            type:userInfo.type,
            uid:uid,
            email:userInfo.email,
            communities:[community.id],
            }
        }
        else
        {
            userData={
                type:userInfo.type,
                uid:uid,
                email:userInfo.email,
                communities:[apartment.communityid],
                apartments:[apartment._id],
            }
        }
        console.log(userData);
        await axios.post(apiBaseUrl,userData )
             .then(function (response) {
                 if (response.status === 201) {           
                  
                  console.log('user is created');
                  console.log(response.data);
                 
                 }
           
             })
             .catch(function (error) {
                 console.log(error);
                 
             });
             
           
       }
     const onSignup=(event)=>{     
       const tokencheck=validateToken();
       console.log(tokencheck);
       if(tokencheck)
       {

             registerUserwithEmailAndPassword();
           
        
        }

      event.preventDefault() 
     }
     const onFacebookSignUp = () => {
        onSignUpWithProvider(new firebase.auth.FacebookAuthProvider());

     }
     const onGoogleSignUp = (event) => {
        onSignUpWithProvider(new firebase.auth.GoogleAuthProvider());
        event.preventDefault() ;
 
     }
     const onChangeUserType=(event)=>{
        setUserInfo((prevState)=>{
            return{...prevState,type:event.target.value}});
     }
     const onChangeEmail=(event)=>{
        setUserInfo((prevState)=>{
            return{...prevState,email:event.target.value}});
     }
     return (
        <Grid   container direction="column" justifyContent="center" alignItems="center">
        <PageHeader>Sign Up</PageHeader>
        <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={onChangeUserType}>        
        <FormControlLabel id="radio_admin"   value="admin"  control={<Radio color="primary" />} label="Admin" />        
        <FormControlLabel id="radio_resident"    value="resident"  control={<Radio color="primary" />} label="Resident" />        
      </RadioGroup>

      <FormControlLabel id="lblToken"  label="Token" labelPlacement="start"
        control={        
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Token</InputLabel>
        <OutlinedInput id="token" type= "text" onChange={(e)=>setToken(e.target.value)} value={token} />
        </FormControl>
        }
        /> 
        
        <FormControlLabel id="lblEmail"  label="Email" labelPlacement="start"
        control={        
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
        <OutlinedInput id="email" type= "text" onChange={onChangeEmail} value={userInfo.email} />
        </FormControl>
        }
        /> 
                     
       <FormControlLabel id="lblpassword"  label="Password" labelPlacement="start"
        control={
        <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
  
          <OutlinedInput   id="outlined-adornment-password" type={password.showPassword ? "text" : "password"} onChange={handlePasswordChange("password")}
              value={password.password}         
              endAdornment={
            <InputAdornment position="end">
              <IconButton  onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                {password.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
              }
          />
        </FormControl>
         }
         /> 
      
      <Button variant="contained" color="primary" onClick={onSignup}>Sign Up </Button>
      <Button variant="contained" color="primary" onClick={onFacebookSignUp}> Signup with Facebook </Button>
      <Button variant="contained" color="secondary" onClick={onGoogleSignUp}> Signup with Google </Button>
    
      </Grid>
    )
}

export default Registration
