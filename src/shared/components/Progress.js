import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

export const Progress = () => {
    return (
        <div style={{
            display: "flex",
            left: '50%',
            top:'50%',
            position: 'fixed',
            margin: 0
          }}> 
    <Grid
  container
  direction="column"
  justifyContent="flex-start"
  alignItems="center"
>
     <CircularProgress/>
     <h3 style={{color:'blue'}}> Please Wait...</h3>
     </Grid>
     </div>   
    )
}
