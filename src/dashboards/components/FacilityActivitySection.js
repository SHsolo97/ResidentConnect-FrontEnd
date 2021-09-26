import React from 'react'

import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";

import {
    Chart,
    BarSeries,
  } from '@devexpress/dx-react-chart-material-ui';

  
  const useStyles = makeStyles({
    barchart: {
  
  
      width: '300px',
      height: '300px'
     
    },
  });const data = [
    { month: 'Jan', booking: 25 },
    { month: 'Feb', booking: 35 },
    { month: 'Mar', booking: 45 },
    { month: 'Apr', booking: 10 },
    { month: 'May', booking: 12 },
    { month: 'June', booking: 15 },
    { month: 'July', booking: 40 },
    { month: 'Aug', booking: 45 },
    { month: 'Sep', booking: 10 },
    { month: 'Oct', booking: 12 },
    { month: 'Nov', booking: 15 },
    { month: 'Dec', booking: 40 },
  
  ];
  
  
export const FacilityActivitySection = () => {
    const classes=useStyles();
    const[chartData]=React.useState(data);

    const renderData=()=>{
        return <Chart className={classes.barchart}
          data={chartData} 
        >

          <BarSeries
            valueField="booking"
            argumentField="month"
          />
        </Chart>
    }
    return (
        <Card>
        <CardHeader color="success">
          <h2 className={classes.cardTitleWhite}>Facility and Activity </h2>
         
        </CardHeader>
        <CardBody>
            {renderData()}
        </CardBody>
      </Card>
    )
}
