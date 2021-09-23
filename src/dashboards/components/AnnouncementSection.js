import React,{useEffect} from 'react'
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardIcon from "../../shared/components/cards/CardIcon.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import CardFooter from "../../shared/components/cards/CardFooter.js";
import styles from "../styles/dashboardStyle.js";
import {fetchAnnouncementsByCommunity} from '../actions/index';
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { useCommunity } from '../../context/community.context.js';
import AnnouncementTable from "../../shared/components/Table/AnnouncementTable.js"


const useStyles = makeStyles(styles);

export const AnnouncementSection = ({...props}) => {
    const classes=useStyles();
    const {community}=useCommunity();
    const [announcements,setAnnouncements]=React.useState([]);

    useEffect(() => {
         props.fetchAnnouncementsByCommunity(community._id);
         console.log(props.announcements);
         const tempAnnouncements=[]
         if(props.announcements!=null)
         {
             props.announcements.map(announcement=>{
                tempAnnouncements.push(announcement);
             })
             console.log(tempAnnouncements);
             setAnnouncements(tempAnnouncements);
             
         }
    }, [])
    return (
        <Card>
        <CardHeader color="success">
          <h2 className={classes.cardTitleWhite}>Announcements</h2>
         
        </CardHeader>
        <CardBody>
        <AnnouncementTable
            tableHeaderColor="success"
            tableHead={["Announcement", "View", "Edit", "Delete"]}
            tableData={announcements}
          />
        </CardBody>
      </Card>
    )
}

const mapStateToProps = (state) => {
    return { announcements: state.announcements };
  };
  
  export default connect(
    mapStateToProps,
    { fetchAnnouncementsByCommunity }
  )(AnnouncementSection);
  
