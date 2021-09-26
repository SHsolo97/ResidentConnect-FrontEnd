import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { orange } from '@material-ui/core/colors';
import {Button} from '@material-ui/core';
import {useModelState} from '../../misc/custom-hooks';
import AddEditApartmentModel from '../components/AddEditApartmentModel';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useProfile } from '../../context/profile.context';
import { useEffect } from 'react';
import ModelCard from '../components/ModelCard';
import Grid from '@material-ui/core/Grid';
import communityAPI from '../../misc/axios-calls/communityAPI';

export const ApartmentModels = ({children,...props}) => {
const { isOpen, open, close } = useModelState();
const {user}=useProfile();
const communityid=user.communities[0];
const [models,setModels]=React.useState([]);
const INTIAIL_VALUE={
communityid:communityid,
name: '',
area:{
carpetarea:0,
builduparea:0,
superbuilduparea:0
},
rooms : {
bedrooms: 0,
bathrooms :0,
balconies: 0,
kitchens : 0,
halls :0,
otherrooms:0
}
}
const addApartmentModel=async(model)=>{
var apiBaseUrl = `/community/apartments/models/create`
console.log(model);
await communityAPI.post(apiBaseUrl,model )
.then(function (response) {
if (response.status === 201)

{
console.log(response.data);
setModels([...models, response.data.model]);




}
})
.catch(function (error) {
console.log(error);

});
}
const getApartmentModels=async()=>{
var apiBaseUrl = `/community/${communityid}/apartments/models`
await communityAPI.get(apiBaseUrl )
.then(function (response) {
if (response.status === 200)

{
console.log(response.data.models);
setModels(response.data.models);


}
})
.catch(function (error) {
console.log(error);

});
}
const editApartmentModel=async(modelToBeEdit)=>{
var apiBaseUrl = `/community/apartments/models/${modelToBeEdit._id}`
await communityAPI.put(apiBaseUrl,modelToBeEdit )
.then(function (response) {
if (response.status === 200)

{
console.log(response.data);
setModels((models) => models.map((model) =>
{
if(model._id === modelToBeEdit._id)
{
return response.data;
}
else

{
return model;
}
}
));




}
})
.catch(function (error) {
console.log(error);

});
}

const deleteModel= async (modelToBeDelete)=>
{
console.log(`delete ${modelToBeDelete._id}`);
var apiBaseUrl = `/community/apartments/models/${modelToBeDelete._id}`
await communityAPI.delete(apiBaseUrl )
.then(function (response) {
if (response.status === 200)
{
console.log(response.data);

setModels((models) => models.filter((model) => model._id !== modelToBeDelete._id));


}
})
.catch(function (error) {
console.log(error);

});

}
useEffect(() => {
getApartmentModels();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


const handleSubmit=(e)=>{
props.handleNext();
}
const handleBack=(e)=>{
props.handleBack();
}
return (

<>

  <Grid container direction="column" justifyContent="space-around" alignItems="center">
    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <PageHeader>{children}</PageHeader>
      <Button variant="contained" style={{backgroundColor: orange[500] }} startIcon={<AddCircleOutlineIcon />} onClick={open}>Add Model</Button>
    </Grid>

    {isOpen &&
    <AddEditApartmentModel actionType="add" model={INTIAIL_VALUE} addApartmentModel={addApartmentModel} handleClose={close} open={open} />}
    
    {
    models.length===0?
    <h2 style={{color:'gray'}}> Please add module </h2>
    :models.map((model)=>

    <ModelCard editApartmentModel={editApartmentModel} deleteModel={deleteModel} model={model} />
    )}
    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
      <PrimaryButton onClick={handleBack}> Back </PrimaryButton>
      <PrimaryButton onClick={handleSubmit}> Next </PrimaryButton>
    </Grid>
  </Grid>
</>
)
}