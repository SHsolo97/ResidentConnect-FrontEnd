import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
commonStyles :{
background: 'linear-gradient(81.96deg, #66C74E -0.53%, rgba(102, 199, 78, 0.5) 98.86%);',
borderColor: 'gray',

borderRadius: '50%' ,

width: '8rem',
height: '8rem',
},
circleAmount: {
marginTop:'50px',
color:'white',
fontWeight:'bold',
padding:'5px',
marginLeft:'35px',
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

<Grid container  direction="row" justifyContent="space-around" alignItems="center">
  <Box className={classes.commonStyles}>
    <div className={classes.circleAmount}>{activePolls} </div>
  </Box>

  <Box className={classes.commonStyles}>
    <div className={classes.circleAmount}> {closedPolls} </div>
  </Box>

  <Box className={classes.commonStyles}>
    <div className={classes.circleAmount}>{participants}</div>
  </Box>

</Grid>

);
}