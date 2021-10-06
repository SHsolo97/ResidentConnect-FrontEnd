import React from 'react'
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { produce } from 'immer';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { uploadImagesToFireStorage } from '../../misc/firestore';
import userAPI from '../../misc/axios-calls/userAPI';
import { Progress } from '../../shared/components/Progress';
import ProfileImageUpload from '../../apartments/components/ProfileImageUpload';


const useStyles = makeStyles((theme) => ({
root: {
display: 'flex',
marginLeft: theme.spacing(30),
flexWrap: 'wrap',
width:"100ch",
marginTop:'5ch',
padding: '1ch',
},
textField: {
marginLeft: theme.spacing(10),
marginRight: theme.spacing(1),
width: '50ch',
},
phoneType: {
marginLeft: theme.spacing(10),
marginRight: theme.spacing(1),
width: '20ch',
},
phoneNumber: {
marginLeft: theme.spacing(10),
marginRight: theme.spacing(1),
width: '20ch',
},
emergencyField: {
marginLeft: theme.spacing(10),
marginRight: theme.spacing(1),
width: '15ch',
},
avatar: {
  marginLeft: theme.spacing(35),
  marginRight: theme.spacing(1),
},

}));

const ProfileSetting = () => {
  
const [avatarImage,setAvatarImage]=React.useState();
const {user,setUser}=useProfile();

const classes = useStyles();
const history=useHistory();
const [formInput,setFormInput]=React.useState(user);

const handleInput = evt => {
const name = evt.target.name;
const newValue = evt.target.value;

// eslint-disable-next-line default-case
switch(name)
{
case "firstname":
setFormInput(produce(formInput, draft => {
draft.firstname = newValue
}));
break;
case "lastname":
setFormInput(produce(formInput, draft => {
draft.lastname = newValue
}));
break;

case "bloodgroup":
setFormInput(produce(formInput, draft => {
draft.bloodgroup = newValue
}));
}


};
const handlePhoneInput=evt=>{
const name = evt.target.name;
const newValue = evt.target.value;
// eslint-disable-next-line default-case
switch(name)
{

case "phone[0].type":
setFormInput(produce(formInput, draft => {
draft.phone[0].type = newValue
}));
break;
case "phone[0].number":
setFormInput( produce(formInput, draft => {
draft.phone[0].number = newValue
}));
break;
case "phone[1].type":
setFormInput(produce(formInput, draft => {
draft.phone[1].type = newValue
}));
break;
case "phone[1].number":
setFormInput( produce(formInput, draft => {
draft.phone[1].number = newValue
}));
break;
}
}
const handleECInput=(evt)=>{
const name = evt.target.name;
const newValue = evt.target.value
// eslint-disable-next-line default-case
switch(name)
{

case "emergencycontacts[0].name":
setFormInput(produce(formInput, draft => {
draft.emergencycontacts[0].name = newValue
}));
break;
case "emergencycontacts[0].relationship":
setFormInput(produce(formInput, draft => {
draft.emergencycontacts[0].relationship = newValue
}));
break;
case "emergencycontacts[0].phone":
setFormInput(produce(formInput, draft => {
draft.emergencycontacts[0].phone = newValue
}));
break;
case "emergencycontacts[1].name":
setFormInput( produce(formInput, draft => {
draft.emergencycontacts[1].name = newValue
}));
break;
case "emergencycontacts[1].relationship":
setFormInput( produce(formInput, draft => {
draft.emergencycontacts[1].relationship = newValue
}));
break;
case "emergencycontacts[1].phone":
setFormInput( produce(formInput, draft => {
draft.emergencycontacts[1].phone = newValue
}));
break;

}
}

const editUser=async(profileData)=>{
  
  var apiBaseUrl = `/users/${user._id}`  
  await userAPI.put(apiBaseUrl,profileData )
       .then(function (response) {
           if (response.status === 200)

          {
              const updatedUserDetails=response.data
              console.log(updatedUserDetails);
              setUser(updatedUserDetails)
              if(user.type==='admin')
              history.push('/dashboardOA')
            else
              history.push('/dashboardOR')
             
            
          }
       })
       .catch(function (error) {
           console.log(error);
            
       });
} 

const handleSubmit=async (event)=>{
event.preventDefault();

//history.push('/apartmentDetailsR');
console.log()
const profileData={}
if(avatarImage!=null)
{
const fileList=[avatarImage];
const path=`${user.id}/avatars`;
const imagefiles=await uploadImagesToFireStorage(path,fileList);
profileData['avatar']=imagefiles[0].url


}

profileData['firstname']= formInput.firstname;
profileData['lastname']=formInput.lastname;
profileData['bloodgroup']=formInput.bloodgroup;
profileData['phone']=formInput.phone;
profileData['emergencycontacts']=formInput.emergencycontacts;
editUser(profileData);

}
const goToDashboard=(event)=>{
  if(user.type==='admin')
    history.push('/dashboardOA')
  else
    history.push('/dashboardOR')
}
const addFile=(filetoUpload)=>{
 setAvatarImage(filetoUpload);

}
const renderUserData=()=>{
  console.log('inside render user data');
  return(
    <form onSubmit={handleSubmit}>

    <div className={classes.avatar}>
     
          <div className={classes.avatar}>
          <ProfileImageUpload previewUrl={formInput.avatar } addFile={addFile} id="classifieldIamge" errorText=""/>
          {avatarImage===null? <div>upload image</div>:null}
          </div>
           
       </div>
    <Paper elevation={3} className={classes.root}>

      <SectionHeader>Basic Details</SectionHeader>
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
    
        <TextField name="firstname" label="First Name" value={formInput.firstname} className={classes.textField} placeholder="first name" fullWidth margin="normal" onChange={handleInput} />
        <TextField name="lastname" label="last Name" value={formInput.lastname} className={classes.textField} placeholder="last name" fullWidth margin="normal" onChange={handleInput} />
        <TextField name="email" label="Email"  disabled value={user.email} className={classes.textField} placeholder="Email" fullWidth margin="normal"  />
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <FormControl style={{ margin: 8, width: '50ch'}} className={classes.formControl}>
          <InputLabel name="phone[0].type" value={formInput.phone[0].type} className={classes.phoneType} >Type</InputLabel>
          <Select name="phone[0].type" value={formInput.phone[0].type} className={classes.phoneType} placeholder="Type" onChange={handlePhoneInput}>
          <MenuItem key="home" value="home">Home</MenuItem>
            <MenuItem key="mobile" value="mobile">Mobile</MenuItem>
            <MenuItem key="office" value="office">Office</MenuItem>
            </Select>
            </FormControl>
          <TextField name="phone[0].number" label="Number" value={formInput.phone[0].number} className={classes.phoneNumber} placeholder="number" fullWidth margin="normal" onChange={handlePhoneInput} />
        </Grid>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <FormControl style={{ margin: 8, width: '50ch'}} className={classes.formControl}>
          <InputLabel name="phone[1].type" value={formInput.phone[1].type} className={classes.phoneType} >Type</InputLabel>
          <Select name="phone[1].type" value={formInput.phone[1].type} className={classes.phoneType} placeholder="Type" onChange={handlePhoneInput}>
          <MenuItem key="home" value="home">Home</MenuItem>
            <MenuItem key="mobile" value="mobile">Mobile</MenuItem>
            <MenuItem key="office" value="office">Office</MenuItem>
            </Select>
            </FormControl>
          <TextField name="phone[1].number" label="Number" value={formInput.phone[1].number} className={classes.phoneNumber} placeholder="number" fullWidth margin="normal" onChange={handlePhoneInput} />
        </Grid>
        <FormControl style={{ margin: 8, width: '50ch'}} className={classes.formControl}>
          <InputLabel id="bloodgroup" value={formInput.bloodgroup} className={classes.textField}>Blood group</InputLabel>
          <Select name="bloodgroup" value={formInput.bloodgroup} className={classes.textField} placeholder="Blood Group" onChange={handleInput}>


            <MenuItem key="A_Pos" value="A Positive">A Positive</MenuItem>
            <MenuItem key="A_Neg" value="A Negative">A Negative</MenuItem>
            <MenuItem key="B_Pos" value="B Positive">B Positive</MenuItem>
            <MenuItem key="AB_Pos" value="AB Positive">AB Positive</MenuItem>
            <MenuItem key="AB_Neg" value="AB Negative">AB Negative</MenuItem>
            <MenuItem key="O_Pos" value="O Positive">O Positive</MenuItem>
            <MenuItem key="O_Neg" value="O Negative">O Negative</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Paper>
    <Paper elevation={3} className={classes.root}>
      <SectionHeader>Emergency Contact Details</SectionHeader>
      <Grid container direction="column" justifyContent="space-around" alignItems="center">
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <TextField name="emergencycontacts[0].name" value={formInput.emergencycontacts[0].name} label="Name" className={classes.emergencyField} placeholder="Name" fullWidth margin="normal" onChange={handleECInput} />
          <TextField name="emergencycontacts[0].relationship" value={formInput.emergencycontacts[0].relationship} label="Relationship" className={classes.emergencyField} placeholder="Relationship" fullWidth margin="normal" onChange={handleECInput} />
          <TextField name="emergencycontacts[0].phone" value={formInput.emergencycontacts[0].phone} label="Phone" className={classes.emergencyField} placeholder="Phone" fullWidth margin="normal" onChange={handleECInput} />
        </Grid>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <TextField name="emergencycontacts[1].name" value={formInput.emergencycontacts[1].name} label="Name" className={classes.emergencyField} placeholder="Name" fullWidth margin="normal" onChange={handleECInput} />
          <TextField name="emergencycontacts[1].relationship" value={formInput.emergencycontacts[1].relationship} label="Relationship" className={classes.emergencyField} placeholder="Relationship" fullWidth margin="normal" onChange={handleECInput} />
          <TextField name="emergencycontacts[1].phone" value={formInput.emergencycontacts[1].phone} label="Phone" className={classes.emergencyField} placeholder="Phone" fullWidth margin="normal" onChange={handleECInput} />
        </Grid>
      </Grid>
    </Paper>
    <Grid container style={{marginTop:'50px'}} direction="row" justifyContent="space-around" alignItems="center">

    <PrimaryButton type="submit"> Update </PrimaryButton>
    <PrimaryButton onClick={goToDashboard}> Cancel </PrimaryButton>
    </Grid>

  </form>
  )
}
return (

<>
    <PageHeader>Profile</PageHeader>
    {formInput===null ?
     <Progress/>:
     renderUserData()
    
    }


   

</>
)
}
export default ProfileSetting;