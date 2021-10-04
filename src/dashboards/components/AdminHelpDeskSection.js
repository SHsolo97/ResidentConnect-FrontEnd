import React from 'react'
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';


const useStyles = makeStyles(styles);

export const AdminHelpDeskSection = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="success">
        <h2 className={classes.cardTitleWhite}>Helpdesk Tracker</h2>
      </CardHeader>
      <CardBody>
      <br/> 
      <br/> 
      <Typography variant='h6'>Open Tickets</Typography>
        <br/><br/>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Grid item direction="column" justifyContent="center" alignItems="center">
            <ApartmentIcon style={{marginLeft:'10px'}} />
            <br/>
            <Typography variant='div'>Community</Typography>
            <br/>
            <Typography  style={{marginLeft:'20px', color:'red',fontSize:'26px'}} variant='div'>45</Typography>

          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item direction="column" justifyContent="center" alignItems="center">

            <HomeWorkIcon style={{marginLeft:'10px'}}/>
            <br/>
            <Typography variant='div'>Personal</Typography>
            <br/>
            <Typography style={{marginLeft:'20px', color:'red',fontSize:'26px'}} variant='div'>13</Typography>

            </Grid>
        </Grid>
        <br/> 
      </CardBody>
    </Card>
  )
}