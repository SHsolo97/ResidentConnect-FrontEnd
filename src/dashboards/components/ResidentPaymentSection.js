/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { connect } from 'react-redux';
import { fetchPaymentOfApartment } from '../actions';

import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import { useApartment } from '../../context/apartment.context';
import PaymentsTable from "../../shared/components/Table/PaymentsTable.js"

const useStyles = makeStyles(styles);

const ResidentPaymentSection =({...props}) =>{
  const {apartment}=useApartment();
  const classes=useStyles();

React.useEffect(() => {
props.fetchPaymentOfApartment(apartment._id);
//console.log(props.payments);
}, [apartment])

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const renderPaymentsData=()=>{
  if(props.payments==null)
  return;
  if(props.payments.length===0)
      {
         return <div style={{marginLeft:'250px'}}> No Pending Payments </div>
      }
  const payments=props.payments;
  return <PaymentsTable
            tableHeaderColor="info"
            tableHead={["Period","Category","Amount","Due Dt","Status","Action"]}
            tableData={payments}
          />
  
}

return (
<Card>
  <CardHeader color="info">
    <h2 className={classes.cardTitleWhite}> Payments </h2>
  </CardHeader>
  <CardBody>
  {renderPaymentsData()}
  </CardBody>
</Card>
)
}
const mapStateToProps = state => {
return {
payments: state.payments.filter(payment=>payment.status!=='paid')

};
};

export default connect(
mapStateToProps,
{ fetchPaymentOfApartment }
)(ResidentPaymentSection);