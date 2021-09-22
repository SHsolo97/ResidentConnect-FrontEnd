import React from 'react'
import { Paper } from '@material-ui/core';
import { SectionHeader } from '../../shared/components/SectionHeader';
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardIcon from "../../shared/components/cards/CardIcon.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import CardFooter from "../../shared/components/cards/CardFooter.js";
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

export const HelpDeskSection = () => {
    const classes=useStyles();
    return (
        <Card>
        <CardHeader color="success">
          <h2 className={classes.cardTitleWhite}>Helpdesk Tracker</h2>
         
        </CardHeader>
        <CardBody>
         
        </CardBody>
      </Card>
    )
}
