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

import img from '../../images/avatars/mypict.jpg'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { uploadImagesToFireStorage } from '../../misc/firestore';
import { FormControlLabel } from '@material-ui/core';
import userAPI from '../../misc/axios-calls/userAPI';
import { Progress } from '../../shared/components/Progress';
import ProfileImageUpload from '../../apartments/components/ProfileImageUpload';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ProfileSettingForm from '../components/ProfileForm';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const profilestore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const ProfileSettingNew= () => {
  
const [avatarImage,setAvatarImage]=React.useState();
const {user,setUser}=useProfile();
const history=useHistory();
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

const onSubmit=async (profileData)=>{

if(avatarImage!=null)
{
const fileList=[avatarImage];
const path=`${user.id}/avatars`;
const imagefiles=await uploadImagesToFireStorage(path,fileList);
profileData['avatar']=imagefiles[0].url


}


editUser(profileData);

}

const addFile=(filetoUpload)=>{
 setAvatarImage(filetoUpload);

}

return (

<>
    <PageHeader>Profile</PageHeader>
    <Provider store={profilestore}>
        <ProfileSettingForm onSubmit={onSubmit}/>
      </Provider>
</>
)
}
export default ProfileSettingNew;