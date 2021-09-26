/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { connect } from 'react-redux';
import { fetchUsersOverview, fetchApartmentsOverview } from '../actions';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const UnitsAndUserSection =({...props}) =>{
const classes=useStyles();
React.useEffect(() => {
props.fetchUsersOverview(props.communityid);
props.fetchApartmentsOverview(props.communityid);
}, [props.communityid])
// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
const renderUserData=() =>{
if (props.userSummary.length !== 0) {
return (
<div>
  <GroupsIcon style={{width:'50px',height:'50px'}} />

  <div> <span style={{fontWeight:'bold', fontSize:'20px'}}> {props.userSummary.total} </span> Users</div>
  <div> {props.userSummary.admin} Admins</div>
  <div> {props.userSummary.resident} Residents</div>
</div>
)
}
return (
<div>
  <GroupsIcon style={{width:'50px',height:'50px'}} />
</div>)
}
const renderApartmentData=()=> {
if (props.apartmentsSummary!=null) {
return (
<div>
  <ApartmentIcon style={{width:'50px',height:'50px'}} />
  <div> <span style={{fontWeight:'bold', fontSize:'20px'}}> {props.apartmentsSummary.total} </span> Units</div>
  { props.apartmentsSummary.status.map(data=>
  {
  return <div> {data.count} {data.type.capitalize()}</div>
  })
  }
</div>
)
}
return (
<div>
  <ApartmentIcon style={{width:'50px',height:'50px'}} />
</div>)
}


return (
<Card>
  <CardHeader color="info">
    <h2 className={classes.cardTitleWhite}>Units &amp; Users</h2>
  </CardHeader>
  <CardBody>
  <Grid
  container
  direction="row"
  justifyContent="space-around"
  alignItems="center"
>
    {renderUserData()}
    <Divider orientation="vertical" flexItem />
    {renderApartmentData()}
    </Grid>
  </CardBody>
</Card>
)
}
const mapStateToProps = state => {
return {
userSummary: state.userSummary,
apartmentsSummary: state.apartmentsSummary
};
};

export default connect(
mapStateToProps,
{ fetchUsersOverview, fetchApartmentsOverview }
)(UnitsAndUserSection);