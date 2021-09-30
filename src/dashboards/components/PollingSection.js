import React,{useEffect} from 'react'
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import PollTable from "../../shared/components/Table/PollTable.js"
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import {fetchActivePollsByCommunity} from '../actions/index';
import { connect } from 'react-redux';
import { useCommunity } from '../../context/community.context';

const useStyles = makeStyles(styles);

export const PollingSection = ({...props}) => {
    const classes = useStyles();
    const [polls,setPolls]=React.useState([]);
    const {community}=useCommunity();
    useEffect(() => {
         props.fetchActivePollsByCommunity(community._id);
         const tempPolls=[];
         if(props.polls!=null)
         {
             // eslint-disable-next-line array-callback-return
             props.polls.map(poll=>{
              tempPolls.push(poll);
             })
             
         }
         setPolls(tempPolls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [community._id])
  
   
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
  