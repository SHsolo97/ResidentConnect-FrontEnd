import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {  OutlinedInput, Grid, TextField, Paper } from '@material-ui/core'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import { auth } from '../../misc/firebase';
import Link from '@material-ui/core/Link';

import { PageHeader } from '../../shared/components/PageHeader';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import logo from '../../images/home/houselogo.png';
import userAPI from '../../misc/axios-calls/userAPI';
import communityAPI from '../../misc/axios-calls/communityAPI';

import lock from '../../images/authentication/lock.png';

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

const Registration = () => {
    const classes = useStyles();
    const history = useHistory();
    const[token,setToken]=useState(null);
    
    let apartment=null;

    let community=null
    let uid=null;
    const[userInfo,setUserInfo]=useState(
        {
            type:'resident',
         
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
             apiBaseUrl=`/community/validatetoken/${token}`;
        else
            apiBaseUrl=`/community/apartments/validatetoken/${token}`;
       await communityAPI.get(apiBaseUrl )
            .then(function (response) {
                if (response.status === 200) {           
                    if(userInfo.type==='admin')                    
                    { 
                      //console.log("save community details");
                      //console.log(response.data);
                      community=response.data; 
                       // console.log(community);
                        
                    }
                    else if(userInfo.type==='resident') 
                    {
                        //console.log("save apartment details");
                      //console.log(response.data);
                      apartment=response.data; 
                      //  console.log(apartment);
                
                    }
                    registerUserwithEmailAndPassword();
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
    //   const onSignUpWithProvider =  async provider => {
        
    //      try {
    //          const result= await auth.signInWithPopup(provider);
    //          console.log(result);           
    //      }
    //      catch (err) {
    //         console.log(err);
    //     }
    //  }
     const registerUserwithEmailAndPassword=()=>{
         //console.log('Register email in Firebase....');
        auth.createUserWithEmailAndPassword(userInfo.email,password.password)
        .then((userCredential) => {
         
        const user = userCredential.user;
       // console.log(user);
        //console.log(uid);

        uid=user.uid;
            createUser();  
             }
        )
             
        .catch((error) => {
            console.log(error)
        
        });
     }
     const createUser=async ()=>{
       // console.log('create userInfo Record...');
       // console.log(community);
        var apiBaseUrl = `/users/create`;
        let userData=null;
        if(userInfo.type==='admin')
        {
            userData={
            type:userInfo.type,
            uid:uid,
            email:userInfo.email,
            communities:[community._id],
            createdat:new Date()
            }
        }
        else
        {
            userData={
                type:userInfo.type,
                uid:uid,
                email:userInfo.email,
                communities:[apartment.communityid],
                apartments:[{
                  communityid:apartment.communityid,
                  apartmentid:apartment._id}],
                  createdat:new Date()
            }
        }
       // console.log(userData);
        await userAPI.post(apiBaseUrl,userData )
             .then(function (response) {
                 if (response.status === 201) {           
                  
                //  console.log('user is created');
                 // console.log(response.data);
                  
                  signOut();
                  history.push('/signin');
                  
                 }
           
             })
             .catch(function (error) {
                 console.log(error);
                 
             });
             
           
       }
     const onSignup=()=>{     
       validateToken();
     }
      
     const signOut=()=>{
        auth.signOut().then(() => {
          history.push('/signin');
      }).catch((error) => {
        console.log(error);
      });
        }
      
    //  const onFacebookSignUp = () => {
    //     onSignUpWithProvider(new firebase.auth.FacebookAuthProvider());

    //  }
    //  const onGoogleSignUp = (event) => {
    //     onSignUpWithProvider(new firebase.auth.GoogleAuthProvider());
    //     event.preventDefault() ;
 
    //  }
     const onChangeUserType=(event)=>{
        setUserInfo((prevState)=>{
            return{...prevState,type:event.target.value}});
     }
     const onChangeEmail=(event)=>{
        setUserInfo((prevState)=>{
            return{...prevState,email:event.target.value}});
     }
     const goToSignIn=(event)=>{
      history.push('/signin');
     }
     return (
      <div className={classes.root}>
      <Grid  container direction="column" justifyContent="space-evenly"  style={{marginLeft:"5px", marginTop:"50px"}} alignItems="center">
      <Paper elevation={3} className={classes.regBox}>

    
        <Grid  container direction="column" justifyContent="space-evenly" alignItems="center">
        <img alt="logo" src={logo}/>

        <PageHeader>Sign Up</PageHeader>
        <img alt="lock" src={lock}/>
        <RadioGroup row aria-label="position" name="usertype" defaultValue="resident" onChange={onChangeUserType}>        
        <FormControlLabel id="radio_admin"   value="admin"  control={<Radio color="primary" />} label="Admin" />        
        <FormControlLabel id="radio_resident"    value="resident"  control={<Radio color="primary" />} label="Resident" />        
         </RadioGroup>

         
     
        <TextField id="token" style={{ margin: 8, width: '30ch'}}    label="Token" value={token} onChange={(e)=>setToken(e.target.value)}  variant="outlined"/>

       
        <TextField id="email" style={{ margin: 8, width: '30ch'}}   label="Email" value={userInfo.email} onChange={onChangeEmail}  variant="outlined"/>
        
        

        <FormControl variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
  
          <OutlinedInput   id="password" type={password.showPassword ? "text" : "password"} onChange={handlePasswordChange("password")}
              value={password.password}         
              endAdornment={
            <InputAdornment position="end">
              <IconButton   aria-label="toggle password visibility" onClick={handleClickShowPassword}
               onMouseDown={handleMouseDownPassword} edge="end">
                {password.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
              }
              label="Password"
          />
        </FormControl>
       
      
      <PrimaryButton onClick={onSignup}>Sign Up </PrimaryButton>

      <Link component="button" variant="body2" onClick={goToSignIn}> Existing User? Sign In </Link>

      </Grid>
      </Paper>
      </Grid>
      </div>
    )
}

export default Registration
