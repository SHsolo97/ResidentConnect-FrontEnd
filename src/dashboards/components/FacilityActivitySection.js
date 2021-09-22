import React from 'react'
import { Paper } from '@material-ui/core';
import { SectionHeader } from '../../shared/components/SectionHeader';
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardIcon from "../../shared/components/cards/CardIcon.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import CardFooter from "../../shared/components/cards/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import ChartistGraph from "react-chartist";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
  } from "../../data/charts.js";
  import styles from "../styles/dashboardStyle.js";
const useStyles = makeStyles(styles);

export const FacilityActivitySection = () => {
    const classes=useStyles();
    return (
        <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
    )
}
