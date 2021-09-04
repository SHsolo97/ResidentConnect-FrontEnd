import { Button, OutlinedInput, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
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
const useStyles=makeStyles((theme)=>({
root: {
display: 'flex',
flexWrap: 'wrap',
width:"100ch",
height: "75ch",
padding: '1ch',
borderRadius:'5ch',
border: '2px solid orange'
}
}));

const SignIn = () => {
const classes=useStyles();
const {user}=useProfile();
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
console.log(email);
console.log(password.password);
auth.signInWithEmailAndPassword(email,password.password)
.then((userCredential) => {
// Signed in
const user = userCredential.user;
console.log(userCredential);
<Alert severity="success">Login Successful</Alert>
console.log('goto profile select');
history.push('/selectprofile');
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

<>
  <Grid container direction="column" justifyContent="center" style={{marginLeft:"5px", marginTop:"200px"}} alignItems="center">
    <PageHeader> Welcome to Residents Connect</PageHeader>

    <Box className={classes.root}>

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

        <Button variant="contained" color="primary" onClick={onSignIn}>Sign In </Button>
        <Button variant="contained" color="primary" onClick={onFacebookSignIn}> Login with Facebook </Button>
        <Button variant="contained" color="secondary" onClick={onGoogleSignIn}> Login with Google </Button>
        <Link component="button" variant="body2" onClick={onSignUp}> New User? Sign Up </Link>
      </Grid>
    </Box>
  </Grid>

</>

)
}

export default SignIn