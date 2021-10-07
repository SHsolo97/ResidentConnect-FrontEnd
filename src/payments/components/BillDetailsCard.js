import React from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {convertDate} from '../../misc/helpers';
import Paper from  '@material-ui/core/Paper';
export const BillDetailsCard = ({...props}) => {
      // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
    return (
        <div>
            <Paper style={{width:'1000px'}}>
            <SectionHeader style={{paddingLeft:'20px',paddingTop:'20px'}}> Bill Details</SectionHeader>

     <Grid container alignItems="center" >
        <Grid style={{paddingLeft:"150px" , paddingTop:"50px"}} item xs={6} >
        <Typography  variant="body2" component="span">
         <span style={{fontWeight:'bold'}}> Community: </span> {props.bill.communityname.capitalize()}         
        </Typography>
        <br/>    <br/>    <br/>
        <Typography  variant="body2" component="span">
        <span style={{fontWeight:'bold'}}> Type:  </span> {props.bill.category.capitalize()} 
        </Typography>
        <br/>    <br/>    <br/>
        <Typography variant="body2" component="span">
        <span style={{fontWeight:'bold'}}> Amount: </span>&#8377; {props.bill.totamt.toLocaleString('en-IN')}
        <br/>    <br/>    <br/>
            
            </Typography>
                
           </Grid>
           <Grid  style={{ paddingTop:"50px"}} item xs={6}>
           <Typography   variant="body2" component="span">
           <span style={{fontWeight:'bold'}}> Apartment: </span> {props.bill.aptnum}         
        </Typography>
        <br/>    <br/>    <br/>
        <Typography variant="body2" component="span">
        <span style={{fontWeight:'bold'}}>  Period:   </span> {props.bill.period} 
        </Typography>
        <br/>    <br/>    <br/>
        <Typography variant="body2" component="span">
        <span style={{fontWeight:'bold'}}>  Due Date: </span>{convertDate(props.bill.dueat)}
        <br/>    <br/>    <br/>
            
            </Typography>
                
               
           </Grid>
           
           </Grid>
    </Paper>
        </div>
    )
}
