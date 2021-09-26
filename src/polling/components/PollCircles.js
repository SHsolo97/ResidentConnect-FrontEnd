import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
activecircle :{
background: 'linear-gradient(81.96deg, #66C74E -0.53%, rgba(102, 199, 78, 0.5) 98.86%);',
borderColor: 'gray',

borderRadius: '50%' ,

width: '8rem',
height: '8rem',
},
closedcircle :{
  background: 'linear-gradient(238.59deg, #F07E7E 1.36%, rgba(240, 126, 126, 0.75) 100.04%);',
  borderColor: 'gray',
  
  borderRadius: '50%' ,
  
  width: '8rem',
  height: '8rem',
  },
  participantscircle :{
    background: 'linear-gradient(239.69deg, #7F82DD 29.99%, rgba(127, 130, 221, 0.6) 126.91%);',
    borderColor: 'gray',
    
    borderRadius: '50%' ,
    
    width: '8rem',
    height: '8rem',
    },
circleAmount: {
marginTop:'10px',
color:'white',
fontWeight:'bold',
paddingLeft:'5px',
paddingTop:'50px',
marginLeft:'50px',
fontSize:'16px',
width:'110px'
}
}));


export default function PollCircles({...props}) {
const classes = useStyles();
const activePolls=props.activePolls==null?0:parseInt(props.activePolls) ;
const closedPolls= (props.closedPolls==null?0:parseInt(props.closedPolls));
const participants= (props.participants==null?0:parseInt(props.participants));


return (

<Grid container style={{marginBottom:'50px'}} direction="row" justifyContent="space-around" alignItems="center">
<Grid items style={{marginBottom:'50px'}} direction="column" justifyContent="space-around" alignItems="flex-start">
    
     <p style={{marginLeft:"40px", color:"#377727", fontWeight:"bold", fontSize:"18px"}}> Active </p>
  <Box className={classes.activecircle}>
    <div className={classes.circleAmount}>{activePolls} </div> 
  </Box>
 
  </Grid>
  <Grid items style={{marginBottom:'50px'}} direction="column" justifyContent="space-around" alignItems="flex-start">
    
     <p style={{marginLeft:"40px", color:"#F43131", fontWeight:"bold", fontSize:"18px"}}> Closed </p>
  <Box className={classes.closedcircle}>
    <div className={classes.circleAmount}> {closedPolls} </div>
  </Box>
  </Grid>
  <Grid items style={{marginBottom:'50px'}} direction="column" justifyContent="space-around" alignItems="flex-start">
    
     <p style={{marginLeft:"20px", color:"#3137E2", fontWeight:"bold", fontSize:"18px"}}> Participants </p>
     <Box className={classes.participantscircle}>
    <div className={classes.circleAmount}>{participants}</div>
  </Box>
  </Grid>
</Grid>

);
}