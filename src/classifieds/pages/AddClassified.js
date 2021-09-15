import React,{useState} from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import {TextField,Button} from '@material-ui/core';
import { useProfile } from '../../context/profile.context';
import { makeStyles } from '@material-ui/core/styles';

import { orange } from '@material-ui/core/colors'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';
import { PhoneList } from '../components/PhoneList';
import ImageUpload from '../components/ImageUpload';
import { storage } from '../../misc/firebase';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useHistory } from 'react-router';
import {uploadImagesToFireStorage} from '../../misc/firestore';
import { getRequest } from '../../misc/http-hooks';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Alert} from '../../shared/components/Alert';
import {useAlertState} from '../../misc/custom-hooks';
import {Progress} from '../../shared/components/Progress';
import classifiedAPI from '../../misc/axios-calls/classifiedAPI';

const MAX_FILE_SIZE = 1000 * 1024 * 5;

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


export const AddClassified = () => {

let file=null;
const history=useHistory();
const [isLoading, setIsLoading] = useState(false);
const { isAlertOpen, openAlert, closeAlert } = useAlertState();
const [alertMessage, setAlertMessage]=useState(null);
const [alertType,setAlertType]=useState(null);
const classes = useStyles();
const {user}=useProfile();
const communityid =user.communities[0];
const [ categories,setCategories]=useState([]);
const [ subCategories,setSubCategories]=useState([]);

const [classified,setClassified]=useState({
communityid:communityid,
thumbnail:'',
category:'',
subcategory:'',
name:'',
description:'',
website:'',
phone:[],
emails:[],
address : {
addressline : '',
area : '',
city: '',
state : '',
pincode : ''
}

});

useEffect(() => {

getCategories();
}, [])
useEffect(() => {

if(classified.category==='')
return;
getSubCategories();
}, [classified.category])

const addClassifieds=async(classifiedData)=>{
var apiBaseUrl = `/classifieds/create`

await classifiedAPI.post(apiBaseUrl,classifiedData )
.then(function (response) {
if (response.status === 201)
{

console.log(response.data);
setIsLoading(false);
setAlertMessage('Classified is Added');
setAlertType('success');
openAlert();
}

})
.catch(function (error) {
console.log(error);
setIsLoading(false);
setAlertMessage(error.message);
setAlertType('error');
openAlert();


});
}
const getSubCategories=async()=>{

var apiBaseUrl = `/classifieds/subcategories`
const data={category:classified.category};
await classifiedAPI.post(apiBaseUrl,data )
.then(function (response) {
if (response.status === 200)
{

setSubCategories(response.data.subcategories);
}

})
.catch(function (error) {
console.log(error);
setAlertMessage(error.message);
setAlertType('error');
openAlert();

});
}
const getCategories=async()=>{

var apiBaseUrl = `/classifieds/categories`
await classifiedAPI.get(apiBaseUrl )
.then(function (response) {
if (response.status === 200)
{

setCategories(response.data.categories);
}

})
.catch(function (error) {
console.log(error);
setAlertMessage(error.message);
setAlertType('error');
openAlert();
});
}


const addFile=(imagefile)=>{
file=imagefile;
}
const addClassified=async()=>{
setIsLoading(true);
const fileList=[file];

const path=`${communityid}/classifieds`;
//const imagefiles=await uploadImageToFireStorage();
const imagefiles=await uploadImagesToFireStorage(path,fileList);
const data=classified;
data.thumbnail=imagefiles[0].url
await addClassifieds(data);

}
const setClassifiedName=(event)=>{
setClassified((prevState)=>{
return{...prevState,name:event.target.value}});
}
const setClassifiedDescription=(event)=>{
setClassified((prevState)=>{
return{...prevState,description:event.target.value}});
}
const setCategory=(event)=>{
setClassified((prevState)=>{
return{...prevState,category:event.target.value}});
}
const setSubCategory=(event)=>{
setClassified((prevState)=>{
return{...prevState,subcategory:event.target.value}});
}

const setAddressLine=(event)=>{
let tempaddress=classified.address
tempaddress.addressline = event.target.value;
setClassified((prevState)=>{
return{...prevState,address:tempaddress}});
}
const setArea=(event)=>{
let tempaddress=classified.address
tempaddress.area = event.target.value;
setClassified((prevState)=>{
return{...prevState,address:tempaddress}});
}

const setCity=(event)=>{
let tempaddress=classified.address
tempaddress.city = event.target.value;
setClassified((prevState)=>{
return{...prevState,address:tempaddress}});
}

const setState=(event)=>{
let tempaddress=classified.address
tempaddress.state = event.target.value;
setClassified((prevState)=>{
return{...prevState,address:tempaddress}});
}
const setPincode=(event)=>{
let tempaddress=classified.address
tempaddress.pincode = event.target.value;
setClassified((prevState)=>{
return{...prevState,address:tempaddress}});
}
const setWebSite=(event)=>{
setClassified((prevState)=>{
return{...prevState,website:event.target.value}});
}
const handleCancel=(event)=>{
history.push('/classifieds');

}


return (

<>
  <PageHeader>Add Classified</PageHeader>
  <form>
    <Grid container direction="column" justifyContent="space-around" alignItems="flex-start">
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <FormControl style={{ margin: 8, width: '50ch'}} variant="outlined" className={classes.formControl}>
          <InputLabel id="label-category">Category</InputLabel>
          <Select id="category" value={classified.category} onChange={setCategory} label="Category">
            {categories.map((category)=>
            <MenuItem key={category.id} name={category.category} value={category.id}>{category.category}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl style={{ margin: 8, width: '50ch'}} variant="outlined" className={classes.formControl}>
          <InputLabel id="label-subcategory">Sub Category</InputLabel>
          <Select id="subcategory" value={classified.subcategory} onChange={setSubCategory} label="Sub Category">
            {subCategories.map((subcategory)=>
            <MenuItem key={subcategory.id} name={subcategory.subcategory} value={subcategory.id}>{subcategory.subcategory}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <TextField id="classifiedname" style={{ margin: 8, width: '100ch'}} margin="normal" label="Classified Name" value={classified.name} onChange={setClassifiedName} variant="outlined" />
      <TextField id="classfieddescription" multiline rows={10} style={{ margin: 8 , width: '100ch'}} margin="normal" label="Classified Description" value={classified.description} onChange={setClassifiedDescription} variant="outlined" />
      <TextField id="addressline" style={{ margin: 8,  width: '100ch' }} margin="normal" label="Address" value={classified.address.addressline} onChange={setAddressLine} variant="outlined" />
      <TextField id="area" style={{ margin: 8 ,  width: '100ch' }} margin="normal" label="Area" value={classified.address.area} onChange={setArea} variant="outlined" />
      <div className={classes.root}>
        <TextField id="city" className={classes.textField} label="City" value={classified.address.city} onChange={setCity} variant="outlined" />
        <TextField id="state" className={classes.textField} label="State" value={classified.address.state} onChange={setState} variant="outlined" />
        <TextField id="pincode" className={classes.textField} label="Pincode" value={classified.address.pincode} onChange={setPincode} variant="outlined" />
      </div>
      <TextField id="website" style={{ margin: 8, width: '100ch'}} margin="normal" label="Website" value={classified.website} InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LanguageTwoToneIcon />
          </InputAdornment>
        ),
      }} onChange={setWebSite} variant="outlined" />



      <ImageUpload addFile={addFile} id="classifieldIamge" errorText="Upload Image" />
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="center">

      <PrimaryButton onClick={addClassified}>Submit</PrimaryButton>
      <PrimaryButton onClick={handleCancel}>Cancel</PrimaryButton>
    </Grid>
  </form>
  {isLoading?
  <Progress />:
  null
  }
  { isAlertOpen?

  <Alert open={isAlertOpen} handleClose={closeAlert} type={alertType}>{alertMessage}</Alert>

  :
  null}
</>
)

}