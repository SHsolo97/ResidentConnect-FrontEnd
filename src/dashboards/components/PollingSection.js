import React,{useEffect} from 'react'
import { Paper } from '@material-ui/core';
import { SectionHeader } from '../../shared/components/SectionHeader';
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardIcon from "../../shared/components/cards/CardIcon.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import CardFooter from "../../shared/components/cards/CardFooter.js";
import PollTable from "../../shared/components/Table/PollTable.js"
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import {fetchActivePollsByCommunity} from '../actions/index';
import { connect } from 'react-redux';
const useStyles = makeStyles(styles);

export const PollingSection = ({...props}) => {
    const classes = useStyles();
    const [polls,setPolls]=React.useState([]);

    useEffect(() => {
        console.log(props.communityid);
         props.fetchActivePollsByCommunity(props.communityid);
         console.log(props.polls);
         if(props.polls!=null)
         {
             props.polls.map(poll=>{
                polls.push(poll);
             })
             console.log(polls);
             
         }
    }, [])
  
    return (
    
        <Card>
        <CardHeader color="warning">
          <h2 className={classes.cardTitleWhite}>Active Polls</h2>
         
        </CardHeader>
        {polls!=null && 
        <CardBody>
          <PollTable
            tableHeaderColor="warning"
            tableHead={["Participate in Poll"]}
            tableData={polls}
          />
        </CardBody>}
      </Card>


    )
}
const mapStateToProps = (state,ownProps) => {
    return { polls: state.polls.filter(poll=>!poll.answeredby.includes(ownProps.userid)) };
  };
  
  export default connect(
    mapStateToProps,
    { fetchActivePollsByCommunity }
  )(PollingSection);
  