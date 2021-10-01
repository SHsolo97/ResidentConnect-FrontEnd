import {  OutlinedInput, Grid,  Paper } from '@material-ui/core'
import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import { auth } from '../../misc/firebase';
import Link from '@material-ui/core/Link';
import TextField from '@mui/material/TextField';

import { PageHeader } from '../../shared/components/PageHeader';

import {PrimaryButton}from '../../shared/components/PrimaryButton';

import logo from '../../images/home/houselogo.png';
import {Alert} from '../../shared/components/Alert';
import {useAlertState}  from '../../misc/custom-hooks';

const useStyles=makeStyles((theme)=>({
  root:{

   

background: 'linear-gradient(149.39deg, #007CC7 50.11%, rgba(0, 124, 199, 0) 144.08%)',
    height:"60ch",
 marginTop:'-10ch'
  },
  signinBox: {
    
  
    marginTop:'30ch',
    display: 'flex',
    flexWrap: 'wrap',

    width:"80ch",
    height: "60ch",
padding: '1ch',
  }
}));

const SignIn = () => {
  const { isAlertOpen, openAlert, closeAlert } = useAlertState();
  const [alertMessage, setAlertMessage]=useState(null);
  const [alertType,setAlertType]=useState(null);

const classes=useStyles();
const history = useHistory();
const[email,setEmail]=useState(null);
const [isError,setError]=useState(null);
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

// const onSignInWithProvider = async provider => {
// /* const results = auth.signOut();
// console.log('Result: ', results); */
// try {
//  await auth.signInWithPopup(provider);
// /*if (additionalUserInfo.isNewUser) {
// await database.ref(`/profiles/${user.uid}`).set({
// name: user.displayName,
// createdAt:firebase.database.ServerValue.TIMESTAMP
// })
// }*/
// //Alert.success("Success", 10000);
// }
// catch (err) {
// //Alert.info(err.message, 10000);
// }
// }
const onSignIn=()=>{

//console.log(email);
//console.log(password.password);

auth.signInWithEmailAndPassword(email,password.password)
.then((userCredential) => {
// Signed in

history.push('/selectprofile');
// ...
})
.catch((error) => {
console.log(error)
setError(error.message);
setAlertMessage(error.message);
setAlertType('error');
openAlert();

});

}
// const onFacebookSignIn = () => {
// onSignInWithProvider(new firebase.auth.FacebookAuthProvider());

// }
// const onGoogleSignIn = () => {
// onSignInWithProvider(new firebase.auth.GoogleAuthProvider());

// }
const onSignUp=()=> {
let path = `/registration`;
history.push(path);

}
const onRegisterCommunity=()=> {
  let path = `/registerCommunity`;
  history.push(path);
  
  }
return (

<div className={classes.root}>
  <Grid container direction="column" justifyContent="center" style={{marginLeft:"5px"}} alignItems="center">

    <Paper elevation={1} className={classes.signinBox}>
   

      <Grid container direction="column"  justifyContent="space-evenly" alignItems="center">
      <img alt="logo" src={logo}/>
      <PageHeader>Sign In</PageHeader>
    
        <TextField id="email" label="Email" onChange={(e)=>setEmail(e.target.value)} variant="outlined" />

        <FormControl variant="outlined">
          <InputLabel  variant="outlined" htmlFor="password">Password</InputLabel>

          <OutlinedInput id="password" type={password.showPassword ? "text" : "password" } onChange={handlePasswordChange("password")} 
          value={password.password} endAdornment={ <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
              {password.showPassword ?
              <Visibility /> :
              <VisibilityOff />}
            </IconButton>
            </InputAdornment>
            }
            label="Password"
            />
        </FormControl>

        <PrimaryButton onClick={onSignIn}>Sign In </PrimaryButton>
      
        <Link component="button" variant="body2" onClick={onSignUp}> New User? Sign Up </Link>
        <Link component="button" variant="body2" onClick={onRegisterCommunity}> New Community? Sign Up </Link>

      </Grid>
    </Paper>
  </Grid>
  { isAlertOpen?
  <Alert open={isAlertOpen} handleClose={closeAlert} type={alertType}>{alertMessage}</Alert>
  :
  null}

</div>

)
}

export default SignIn