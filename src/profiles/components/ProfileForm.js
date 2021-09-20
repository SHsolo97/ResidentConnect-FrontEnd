import React,{ useReducer } from 'react'
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { produce, setUseProxies } from 'immer';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from 'react-redux';

import img from '../../images/avatars/mypict.jpg'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { uploadImagesToFireStorage } from '../../misc/firestore';
import { FormControlLabel } from '@material-ui/core';
import userAPI from '../../misc/axios-calls/userAPI';
import { Progress } from '../../shared/components/Progress';
import ProfileImageUpload from '../../apartments/components/ProfileImageUpload';
import {required,email,pinNumber,minLength, renderTextField,renderSelectField} from "../../misc/form-fields";

import { fetchCurrentUser } from '../actions';

const ProfileForm = ({...props}) => {
    const { error, array: { push },submitting} = props

const [avatarImage,setAvatarImage]=React.useState();
const {user,setUser}=useProfile();
const history=useHistory();

React.useEffect(() => {
    props.fetchCurrentUser(user._id);
    
}, [])



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
              history.push('/dashboardA')
            else
              history.push('/dashboardR')
             
            
          }
       })
       .catch(function (error) {
           console.log(error);
            
       });
} 

const handleSubmit=async ()=>{

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


editUser(profileData);

}
const goToDashboard=(event)=>{
  if(user.type==='admin')
    history.push('/dashboardA')
  else
    history.push('/dashboardR')
}
const addFile=(filetoUpload)=>{
 setAvatarImage(filetoUpload);

}
const renderUserData=()=>{
    
  return(
    <form onSubmit={handleSubmit}>

    <div>
     
          <div >
          <ProfileImageUpload previewUrl={user.avatar } addFile={addFile} id="classifieldIamge" errorText=""/>
          {avatarImage===null? <div>upload image</div>:null}
          </div>
           
       </div>
    <Box >

      <SectionHeader>Basic Details</SectionHeader>
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      <Field id="firstname" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="firstname" label="First Name" component={renderTextField} variant="standard" />
      <Field id="lastname" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="lastname" label="Last Name" component={renderTextField} variant="standard" />
      <Field id="email" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="email" label="Email" component={renderTextField} variant="standard" />

        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <Field style={{ margin: 8, width: '50ch'}} name="phone[0].type" label="Type"   validate ={[required]} 
          component={renderSelectField}  variant="standard">
             
          <MenuItem key="home" value="home">Home</MenuItem>
            <MenuItem key="mobile" value="mobile">Mobile</MenuItem>
            <MenuItem key="office" value="office">Office</MenuItem>
          </Field>
            <Field id="phone[0].number" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="phone[0].number" label="Number" component={renderTextField} variant="standard" />

        </Grid>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
       
          <Field style={{ margin: 8, width: '50ch'}} name="phone[1].type" label="Type"   validate ={[required]} 
          component={renderSelectField}  variant="standard">
             
          <MenuItem key="home" value="home">Home</MenuItem>
            <MenuItem key="mobile" value="mobile">Mobile</MenuItem>
            <MenuItem key="office" value="office">Office</MenuItem>
          </Field>
            <Field id="phone[1].number" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="phone[1].number" label="Number" component={renderTextField} variant="standard" />

        </Grid>
          <Field style={{ margin: 8, width: '50ch'}} name="bloodgroup" label="Blood Group"   validate ={[required]} 
          component={renderSelectField}  variant="standard">
       
         

            <MenuItem key="A_Pos" value="A Positive">A Positive</MenuItem>
            <MenuItem key="A_Neg" value="A Negative">A Negative</MenuItem>
            <MenuItem key="B_Pos" value="B Positive">B Positive</MenuItem>
            <MenuItem key="B_Pos" value="B Negative">B Negative</MenuItem>
            <MenuItem key="AB_Pos" value="AB Positive">AB Positive</MenuItem>
            <MenuItem key="AB_Neg" value="AB Negative">AB Negative</MenuItem>
            <MenuItem key="O_Pos" value="O Positive">O Positive</MenuItem>
            <MenuItem key="O_Neg" value="O Negative">O Negative</MenuItem>
            </Field>
       
      </Grid>
    </Box>
    <Box >
      <SectionHeader>Emergency Contact Details</SectionHeader>
      <Grid container direction="column" justifyContent="space-around" alignItems="center">
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Field id="emergencycontacts[0].name" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="emergencycontacts[0].name" label="Name" component={renderTextField} variant="standard" />
        <Field id="emergencycontacts[0].relationship" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="emergencycontacts[0].relationship" label="Relationship" component={renderTextField} variant="standard" />
        <Field id="emergencycontacts[0].phone" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="emergencycontacts[0].phone" label="Phone" component={renderTextField} variant="standard" />

        </Grid>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Field id="emergencycontacts[1].name" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="emergencycontacts[1].name" label="Name" component={renderTextField} variant="standard" />
        <Field id="emergencycontacts[1].relationship" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="emergencycontacts[1].relationship" label="Relationship" component={renderTextField} variant="standard" />
        <Field id="emergencycontacts[1].phone" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="emergencycontacts[1].phone" label="Phone" component={renderTextField} variant="standard" />

        </Grid>
      </Grid>
    </Box>
    <PrimaryButton type="submit"> Update </PrimaryButton>
    <PrimaryButton onClick={goToDashboard}> Cancel </PrimaryButton>

  </form>
  )
}
return (<div>  
  
   {renderUserData()}
 

    </div> 
)
}

function mapStateToProps(state) {
    return { initialValues:  state.user }
}
let ProfileSettingForm= reduxForm({
    form: "profileForm", // a unique identifier for this form
    enableReinitialize : true 
  })(ProfileForm);



  export default connect(
    mapStateToProps,
    { fetchCurrentUser }
  )(ProfileSettingForm);





  