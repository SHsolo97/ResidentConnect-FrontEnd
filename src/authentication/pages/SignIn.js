import { Button, OutlinedInput, Grid, TextField, Paper } from '@material-ui/core'
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
import firebase from 'firebase/app';
import { auth,database } from '../../misc/firebase';
import Link from '@material-ui/core/Link';
import {Redirect} from 'react-router-dom';
import { useProfile } from '../../context/profile.context';
import { PageHeader } from '../../shared/components/PageHeader';
import { Box } from '@material-ui/core';
import PrimaryButton from '../../shared/components/PrimaryButton';
import img2 from '../../images/home/img9.jfif'
import logo from '../../images/home/houselogo.png';
import {Alert} from '../../shared/components/Alert';
import {useAlertState}  from '../../misc/custom-hooks';

const useStyles=makeStyles((theme)=>({
  root: {
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
const {user}=useProfile();
const history = useHistory();
const[email,setEmail]=useState(null);
const [error,setError]=useState(null);
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

const onSignInWithProvider = async provider => {
/* const results = auth.signOut();
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
//console.log(email);
//console.log(password.password);

auth.signInWithEmailAndPassword(email,password.password)
.then((userCredential) => {
// Signed in
const user = userCredential.user;
console.log(userCredential);
console.log('goto profile select');
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

<>
  <Grid container direction="column" justifyContent="center" style={{marginLeft:"5px"}} alignItems="center">
  <img src={logo}/>

    <Paper elevation={10} className={classes.root}>

      <Grid container direction="column"  justifyContent="space-evenly" alignItems="center">
        <PageHeader>Sign In</PageHeader>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput id="email" type="text" onChange={(e)=>setEmail(e.target.value)} value={email} />
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

          <OutlinedInput id="outlined-adornment-password" type={password.showPassword ? "text" : "password" } onChange={handlePasswordChange("password")} value={password.password} endAdornment={ <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
              {password.showPassword ?
              <Visibility /> :
              <VisibilityOff />}
            </IconButton>
            </InputAdornment>
            }
            />
        </FormControl>

        <PrimaryButton variant="contained" color="primary" onClick={onSignIn}>Sign In </PrimaryButton>
      
        <Link component="button" variant="body2" onClick={onSignUp}> New User? Sign Up </Link>
      </Grid>
    </Paper>
  </Grid>
  { isAlertOpen?
  <Alert open={isAlertOpen} handleClose={closeAlert} type={alertType}>{alertMessage}</Alert>
  :
  null}

</>

)
}

export default SignIn