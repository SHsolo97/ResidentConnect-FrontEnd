import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { BillDetailsCard } from '../components/BillDetailsCard'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { PayBillByCard } from '../components/PayBillByCard';
import { PayBillByNetBanking } from '../components/PayBillByNetBanking';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        
      
        {...other}
      >
        {value === index && (
         
            <Typography>{children}</Typography>
          
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  

  
export const PayBill = ({...props}) => {
    console.log(props.location.state);
    const {bill}=props.location.state
    console.log(bill);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    return (
        <div>
            <PageHeader> Pay Bill</PageHeader>
            <BillDetailsCard bill={bill}/>
            <div >
      <div position="static" color="default">
        <Tabs  textColor="primary"
        indicatorColor="primary" value={value} onChange={handleChange}>
          <Tab label="Net Banking" id="netbanking" />
          <Tab label="Credit/Debit"  id="card" />
          
        </Tabs>
      </div>
     
      <TabPanel id="netbanking" value={value} index={0}>
       <PayBillByNetBanking />
      </TabPanel>
      <TabPanel  id="card"  value={value} index={1}>
        <PayBillByCard bill={bill} />
      </TabPanel>
    </div>
        </div>
    )
}
