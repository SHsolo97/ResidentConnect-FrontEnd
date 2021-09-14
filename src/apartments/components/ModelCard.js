/* eslint-disable no-underscore-dangle */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddEditApartmentModel from './AddEditApartmentModel';

import { useModelState } from '../../misc/custom-hooks';

const useStyles = makeStyles({
  card: {
    marginLeft:200,
    marginTop:30,
    width: 700
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ModelCard({children,...props}) {
  const { isOpen, open, close } = useModelState();
  
  const classes = useStyles();
 const {model} = props;
 
 const deleteModel=(event)=>{
  console.log(`delete ${model._id}`);
  props.deleteModel(model);

  event.preventDefault();
  event.stopPropagation()
 }
 const editApartmentModel=(modelTobeEdit)=>{
   props.editApartmentModel(modelTobeEdit);
 }
  return (
    
      <Card  elevation={10} value={props.key} className={classes.card}>
      <CardContent>
      <Grid
  container
  direction="row"
  justifyContent="flex-end"
  alignItems="baseline"
>

<Button onClick={open}> <EditIcon/></Button>
{isOpen && <AddEditApartmentModel  actionType="edit" model={model} editApartmentModel={editApartmentModel} handleClose={close} open={open} />}
                     
<Button onClick={deleteModel}> <DeleteIcon /> </Button>
      </Grid>

        <Typography variant="h5" component="h2">
          {model.name}
        </Typography>
        
        <Grid container spacing={3}>
        
        <Grid item xs={4}>
        <Typography variant="body2" component="span"> Carpet Area: {model.area.carpetarea}</Typography> <br/>
        <Typography variant="body2" component="span"> BedRooms: {model.rooms.bedrooms}</Typography> <br/>
        <Typography variant="body2" component="span"> Kitchens: {model.rooms.kitchens}</Typography>
        </Grid>
           <Grid item xs={4}>
           <Typography variant="body2" component="span"> Buildup Area: {model.area.builduparea}</Typography> <br/>
             <Typography variant="body2" component="span"> Bathrooms: {model.rooms.bathrooms}</Typography> <br/>
             <Typography variant="body2" component="span"> Halls: {model.rooms.halls}</Typography>
               
           </Grid>
           <Grid item xs={4}>
           <Typography variant="body2" component="span"> Super Buildup Area: {model.area.superbuilduparea}</Typography> <br/>
             <Typography variant="body2" component="span"> Balconies: {model.rooms.balconies}</Typography> <br/>
             <Typography variant="body2" component="span"> Other Rooms: {model.rooms.otherrooms}</Typography>
              
            
               
           </Grid>
           </Grid>
      </CardContent>
     
    </Card>
   
  );
}
