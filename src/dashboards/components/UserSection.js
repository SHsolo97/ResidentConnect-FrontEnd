/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { connect } from 'react-redux';
import { fetchUsersByApartmentId } from '../actions';
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import { useApartment } from '../../context/apartment.context';
import UsersTable from "../../shared/components/Table/UsersTable.js"

const useStyles = makeStyles(styles);

const UserSection =({...props}) =>{
  const {apartment}=useApartment();
  const classes=useStyles();

React.useEffect(() => {
  if(apartment==null) 
  return;
props.fetchUsersByApartmentId(apartment._id);
//console.log(props.users);
}, [apartment])

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const renderUserData=()=>{
  if(props.users===null  || apartment===null)
  return null;
  const users=props.users;
  return  (<Card> <CardHeader color="info">
  <h2 className={classes.cardTitleWhite}>Unit  - {apartment.aptnum} </h2>
</CardHeader>
<CardBody>
  <UsersTable
            tableHeaderColor="info"
            tableHead={["Avatar","Name","Phone"]}
            tableData={users}
          />
            </CardBody>
            </Card>)

  
}

return (

 <div>
  {(props.users===null  || apartment===null )? <CircularProgress/> : renderUserData()}
  </div>

)
}
const mapStateToProps = state => {
return {
users: state.users

};
};

export default connect(
mapStateToProps,
{ fetchUsersByApartmentId }
)(UserSection);