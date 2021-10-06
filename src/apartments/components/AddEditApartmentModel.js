import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

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
export default function AddEditApartmentModel({...props}) {
    const classes = useStyles();
    const [modelDetails,setModelDetails]=useState(props.model);
    const addBlock=()=>
    {
        //console.log(modelDetails);
        props.addApartmentModel(modelDetails);
        props.handleClose();
    }

    const editBlock=()=>
    {
     // console.log(modelDetails);
      props.editApartmentModel(modelDetails);
      props.handleClose();
      
    }
    

   
      const setModelName = (event) => {
        setModelDetails((prevState)=>{
            return{...prevState, name : event.target.value}});
      };
      const setCarpetArea = (event) => {
        const temparea=modelDetails.area
        temparea.carpetarea = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,area : temparea}});
      };
      const setBuildUpArea = (event) => {
        const temparea=modelDetails.area
        temparea.builduparea = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,area:temparea}});
      };
      const setSuperBuildUpArea = (event) => {
        const temparea=modelDetails.area
        temparea.superbuilduparea = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,area:temparea}});
      };
     
    
      const setBedRooms = (event) => {
        const temprooms=modelDetails.rooms
        temprooms.bedrooms = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,rooms:temprooms}});
      };
      const setBathrooms = (event) => {
        const temprooms=modelDetails.rooms
        temprooms.bathrooms = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,rooms:temprooms}});
      };

   
     
  
      const setBalconies = (event) => {
        const temprooms=modelDetails.rooms
       
        temprooms.balconies = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,rooms:temprooms}});
      };

      const setKitchens = (event) => {
        const temprooms=modelDetails.rooms
        temprooms.kitchens = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,rooms:temprooms}});
      };

      const setHalls = (event) => {
        const temprooms=modelDetails.rooms
        temprooms.halls = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,rooms:temprooms}});
      };

      const setOtherrooms = (event) => {
        const temprooms=modelDetails.rooms
        temprooms.otherrooms = parseInt(event.target.value, 10);
        setModelDetails((prevState)=>{
            return{...prevState,rooms:temprooms}});
      };
     
  return (
 
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Apartment Model</DialogTitle>
        <DialogContent>
          
          <form  >
     
      
      
           
        
          <TextField id="modelname"  style={{ margin: 8 , width: '30ch'}}   margin="normal"  label="Model Name" value={modelDetails.name} onChange={setModelName} variant="outlined"/>
          <div className={classes.root}>
      
            <TextField id="carpetarea" style={{ margin: 8,  width: '15ch' }}   margin="normal" label="Carpet Area" value={modelDetails.area.carpetarea} onChange={setCarpetArea} variant="outlined"/>
            <TextField id="builduparea"  style={{ margin: 8 ,  width: '15ch' }}   margin="normal" label="Build Up Area" value={modelDetails.area.builduparea} onChange={setBuildUpArea} variant="outlined"/>
            <TextField id="superbuilduparea"  style={{ margin: 8 ,  width: '15ch' }}   margin="normal" label="Super Up Area" value={modelDetails.area.superbuilduparea} onChange={setSuperBuildUpArea} variant="outlined"/>
            </div>
         <div className={classes.root}>
            
         <TextField id="bedrooms" style={{ margin: 8,  width: '15ch' }}   margin="normal" label="Bed Rooms" value={modelDetails.rooms.bedrooms} onChange={setBedRooms} variant="outlined"/>
            <TextField id="bathrooms"  style={{ margin: 8 ,  width: '15ch' }}   margin="normal" label="Bathrooms" value={modelDetails.rooms.bathrooms} onChange={setBathrooms} variant="outlined"/>
            <TextField id="balconies"  style={{ margin: 8 ,  width: '15ch' }}   margin="normal" label="Balconies" value={modelDetails.rooms.balconies} onChange={setBalconies} variant="outlined"/>
            </div>

            <div className={classes.root}>
            
            <TextField id="kitchens" style={{ margin: 8,  width: '15ch' }}   margin="normal" label="Kitchens" value={modelDetails.rooms.kitchens} onChange={setKitchens} variant="outlined"/>
               <TextField id="halls"  style={{ margin: 8 ,  width: '15ch' }}   margin="normal" label="Halls" value={modelDetails.rooms.halls} onChange={setHalls} variant="outlined"/>
               <TextField id="otherrooms"  style={{ margin: 8 ,  width: '15ch' }}   margin="normal" label="Other rooms" value={modelDetails.rooms.otherrooms} onChange={setOtherrooms} variant="outlined"/>
               </div>
           

    </form>
        </DialogContent>
        <DialogActions>
         {props.actionType==='add'?
          <Button onClick={addBlock} color="primary">
            Add
          </Button>:
          <Button onClick={editBlock} color="primary">
          Edit
        </Button>
          }
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}