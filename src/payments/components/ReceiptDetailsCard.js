import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {convertDate} from '../../misc/helpers';
const TAX_RATE = 0.05;

export default function ReceiptDetailsCard({bill}) {
     // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
const renderOverview=()=>{
    
    return(
        <div style={{marginLeft:'50px',paddingTop:'50px', width:'900px'}}>
        <Paper style={{ width:'900px'}}>
            <Grid container alignItems="space-evenly" justifyContent="center">
    <Grid style={{paddingLeft:"50px" , paddingTop:"50px"}} item xs={6} >
    <Typography  variant="body2" component="span">
     <span style={{fontWeight:'bold'}}> Community: </span> {bill.communityname}         
    </Typography>
    <br/>    <br/>    <br/>
    <Typography  variant="body2" component="span">
    <span style={{fontWeight:'bold'}}> Type:  </span> {bill.category.capitalize()} 
    </Typography>
    <br/>    <br/>    <br/>
    <Typography variant="body2" component="span">
    <span style={{fontWeight:'bold'}}> Amount: </span>&#8377; {bill.totamt.toLocaleString('en-IN')}
    <br/>    <br/>    <br/>
        
        </Typography>
            
       </Grid>
       <Grid  style={{ paddingTop:"50px",paddingLeft:"150px" }} item xs={6}>
       <Typography   variant="body2" component="span">
       <span style={{fontWeight:'bold'}}> Apartment: </span> {bill.aptnum}         
    </Typography>
    <br/>    <br/>    <br/>
    <Typography variant="body2" component="span">
    <span style={{fontWeight:'bold'}}>  Period:   </span> {bill.period} 
    </Typography>
    <br/>    <br/>    <br/>
    <Typography variant="body2" component="span">
    <span style={{fontWeight:'bold'}}>  Due Date: </span>{convertDate(bill.dueat)}
    <br/>    <br/>    <br/>
        
        </Typography>
            
           
       </Grid>
       
       </Grid>
       </Paper>
       </div>)
}
const renderDetails=()=>{
    return(
        <div style={{paddingTop:'50px',marginLeft:'50px'}}>
        <TableContainer  style={{width: 900 ,paddding:'50px'}} component={Paper}>
          <Table sx={{ width: 800 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{fontWeight:'bold'}} colSpan={1}>
                  Details
                </TableCell>
                <TableCell align="right" style={{fontWeight:'bold'}}  colSpan={2}>Price</TableCell>
              </TableRow>
              
            </TableHead>
            <TableBody>
            
                <TableRow key="main">
                  <TableCell align="left" >{bill.category.capitalize()}</TableCell>
                 
                  <TableCell align="right" colSpan={2}>&#8377; {(bill.amt*.95).toLocaleString('en-IN')} </TableCell>
                </TableRow>
                <TableRow key="main">
                  <TableCell align="left" >Fine</TableCell>
                 
                  <TableCell align="right" colSpan={2}>&#8377; {bill.fine.toLocaleString('en-IN')} </TableCell>
                </TableRow>
    
              <TableRow>
                
                <TableCell   align="left" colSpan={2} >Subtotal</TableCell>
                <TableCell align="right">&#8377; {((bill.amt*.95) + (bill.fine)).toLocaleString('en-IN')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right"> &#8377; {(bill.amt*TAX_RATE).toLocaleString('en-IN')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={2}>Total</TableCell>
                <TableCell align="right">&#8377; {bill.totamt.toLocaleString('en-IN')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    )
}
const renderPaymentDetails=()=>{
    return(
        <div  style={{paddingBottom:'50px', width:'900px'}}>
        <Paper style={{marginLeft:'50px',marginTop:'50px', padding:'20px',width:'900px'}}>
            <Grid container row alignItems="center" justifyContent="space-between">
    <Grid>
    <Typography  variant="body2" component="span">
     <span style={{fontWeight:'bold'}}> Payment Type: </span> {bill.paymentdetails.type}         
    </Typography>
    </Grid>
    <Grid>    
    <Typography  variant="body2" component="span">
    <span style={{fontWeight:'bold'}}> Paid With:  </span> {bill.paymentdetails.cardnumber} 
    </Typography>
    </Grid>
    </Grid>
    </Paper>
    </div>);
}
  return (
     <div>
     {renderOverview()}
     {renderDetails()}
     {renderPaymentDetails()}
     </div> 
  );
}
