import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import {  Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  timeslot: {
    margin: theme.spacing(0.5),
  },
}));

export default function TimeSlotArray({...props}) {
  const classes = useStyles();
  const {timeSlotChip}=props;

  return (
    <Grid container
    direction="column"
    justifyContent="center"
    alignItems="center">
   
    <Paper component="ul" className={classes.root}>
      {timeSlotChip!=null &&  timeSlotChip.map((data) => {
      
        return (
          
        
       
          
          <li key={data.key}>
            <Chip             
              label={data.label}
              onDelete={props.handleDelete(data)}
              className={classes.timeslot}
            />
          </li>
         
        
        );
      })}
    </Paper>
    </Grid>
  );
}