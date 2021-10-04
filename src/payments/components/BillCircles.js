import React from 'react';
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
        marginLeft:'25px',
        fontSize:'16px',
        width:'110px'
  }
}));


export default function BillCircles({...props}) {
    const classes = useStyles();
    console.log(props.totalPaid);
    console.log(props.totalDue);
    console.log(props.totalOverdue);
    const totalpaid=props.totalPaid==null?0:parseInt(props.totalPaid) ;
    const totalDue= (props.totalDue==null?0:parseInt(props.totalDue)) +
    (props.totalOverdue==null?0:parseInt(props.totalOverdue));
    const totalAmount=totalpaid+totalDue;

  return (

    <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
   
  >
     
      
       <div  > Total Due</div>
        <Box className={classes.commonStyles}>
            <div className={classes.circleAmount}> &#8377; {totalAmount.toLocaleString('en-IN')} </div></Box>
         
      
       <div  style={{   marginTop:'50px'}}> Collected</div>
      <Box className={classes.commonStyles}>
      <div className={classes.circleAmount}>  &#8377; {totalpaid.toLocaleString('en-IN')} </div></Box>
         
      
       <div  style={{   marginTop:'50px'}}> Due</div>
      <Box className={classes.commonStyles}>
      <div className={classes.circleAmount}>&#8377; {totalDue.toLocaleString('en-IN')}</div></Box>
     
   </Grid>
  
  );
}