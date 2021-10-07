import React from 'react'
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';


const useStyles = makeStyles(styles);

export const ResidentHelpDeskSection = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="success">
        <h2 className={classes.cardTitleWhite}>Helpdesk Tracker</h2>
      </CardHeader>
      <CardBody>
      <br/> 
      <br/> 
        
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Grid item direction="column" justifyContent="center" alignItems="center">
            
            <br/>
            <Typography variant='div'>Closed</Typography>
            <br/>
            <Typography  style={{marginLeft:'15px', color:'red',fontSize:'18px'}} variant='div'>45</Typography>

          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item direction="column" justifyContent="center" alignItems="center">

           
            <br/>
            <Typography variant='div'>Open</Typography>
            <br/>
            <Typography style={{marginLeft:'15px', color:'red',fontSize:'18px'}} variant='div'>2</Typography>

            </Grid>
        </Grid>
        <br/> 
      </CardBody>
    </Card>
  )
}