import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import axis from '../../images/payments/axis.jpg';
import city from '../../images/payments/citi.jpg';
import icici from '../../images/payments/icici.jpg';
import kotak from '../../images/payments/kotak.jpg';
import sbi from '../../images/payments/sbi.jpg';
import yes from '../../images/payments/yes.jpg';
import hdfc from '../../images/payments/hdfc.jpg';
import Paper from '@mui/material/Paper';
import {PrimaryButton}from "../../shared/components/PrimaryButton";

export const PayBillByNetBanking = () => {
const [value, setValue] = React.useState('female');

const handleChange = (event) => {
setValue(event.target.value);
};
const openNetBanking=()=>{
switch(value)
{
case "hdfc":
window.open('https://netbanking.hdfcbank.com/netbanking/');
break;
case "axis":
window.open('https://retail.axisbank.co.in/');
break;
case "sbi":
window.open('https://retail.onlinesbi.com/retail/login.htm');
break;
case "icici":
window.open('https://www.icicibank.com/Personal-Banking/insta-banking/internet-banking/index.page');
break;
case "kotak":
window.open('https://retail.onlinesbi.com/retail/login.htm');
break;
case "yes":
window.open('https://retail.onlinesbi.com/retail/login.htm');
break;
default:


}
}
return (
<Paper>
<Grid container direction="column" justifyContent="space-around" alignItems="flex-start">

  <FormControl style={{paddingLeft:'50px'}} component="fieldset">
    <br /> <br /> <br />
    <RadioGroup value={value} onChange={handleChange}>
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <FormControlLabel value="hdfc" control={<Radio />} label="HDFC"/>


        <img alt="card logo" src={hdfc} />
      </Grid><br /><br />
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <FormControlLabel value="icici" control={<Radio />} label="ICICI" />
        <img alt="card logo" src={icici} />
      </Grid>
      <br /><br />
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <FormControlLabel value="axis" control={<Radio />} label="Axis" />
        <img alt="card logo" src={axis} />
      </Grid><br /><br />
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <FormControlLabel value="sbi" control={<Radio />} label="SBI" />
        <img alt="card logo" src={sbi} />
      </Grid><br /><br />
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <FormControlLabel value="kotak" control={<Radio />} label="Kotak" />
        <img alt="card logo" src={kotak} />
      </Grid><br /><br />
    </RadioGroup>
  </FormControl>

  <PrimaryButton style={{marginLeft:'400px',marginBottom:'50px'}} onClick={openNetBanking}> Pay </PrimaryButton>
    </Grid>

</Paper>
)
}