import { Button, OutlinedInput, Grid, TextField } from '@material-ui/core'
import  React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
const SignIn = () => {
   
    const history = useHistory();
    const[email,setEmail]=useState(null);
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
      
      const handlePasswordChange = (prop) => (event) => {
        setPassword({ ...password, [prop]: event.target.value });
      };
      
      const onSignInWithProvider =  async provider => {
        /* const results =  auth.signOut();
          console.log('Result: ', results); */
         try {
             const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
             /*if (additionalUserInfo.isNewUser) {
                 await database.ref(`/profiles/${user.uid}`).set({
                     name: user.displayName,
                     createdAt:firebase.database.ServerValue.TIMESTAMP
                 })
             }*/
             //Alert.success("Success", 10000);
         }
         catch (err) {
             //Alert.info(err.message, 10000);
         }
     }
     const onSignIn=()=>{
       var userType='admin';
       console.log(email);
       console.log(password.password);
       auth.signInWithEmailAndPassword(email,password.password)
       .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.log(error)
      });

     }
     const onFacebookSignIn = () => {
         onSignInWithProvider(new firebase.auth.FacebookAuthProvider());
 
     }
     const onGoogleSignIn = () => {
         onSignInWithProvider(new firebase.auth.GoogleAuthProvider());
 
     }
     const onSignUp=()=> {
        let path = `/registration`;
        history.push(path);
     
     }
    return (
      <Grid   container direction="column" justifyContent="center" alignItems="center">
      <h2> Welcome to Resident connect</h2>
      <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
      <OutlinedInput id="email" type= "text" onChange={(e)=>setEmail(e.target.value)} value={email} />
      </FormControl>
                   
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
    
    <Button variant="contained" color="primary" onClick={onSignIn}>Sign In </Button>
    <Button variant="contained" color="primary" onClick={onFacebookSignIn}> Login with Facebook </Button>
    <Button variant="contained" color="secondary" onClick={onGoogleSignIn}> Login with Google </Button>
    <Link  component="button" variant="body2" onClick ={onSignUp}>  New User? Sign Up </Link>
    </Grid>
             
         
      
    )
}

export default SignIn
