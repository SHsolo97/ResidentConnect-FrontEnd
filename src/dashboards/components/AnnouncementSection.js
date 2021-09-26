import React,{useEffect} from 'react'
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import styles from "../styles/dashboardStyle.js";
import {fetchAnnouncementsByCommunity} from '../actions/index';
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { useCommunity } from '../../context/community.context.js';
import AnnouncementTable from "../../shared/components/Table/AnnouncementTable.js"
import { useProfile } from '../../context/profile.context.js';


const useStyles = makeStyles(styles);

export const AnnouncementSection = ({...props}) => {
    const classes=useStyles();
    const {user}=useProfile();
    const {community}=useCommunity();
    const [announcements,setAnnouncements]=React.useState([]);

    useEffect(() => {
         props.fetchAnnouncementsByCommunity(community._id);
        // console.log(props.announcements);
         const tempAnnouncements=[]
         if(props.announcements!=null)
         {
             // eslint-disable-next-line array-callback-return
             props.announcements.map(announcement=>{
                tempAnnouncements.push(announcement);
         })
             console.log(tempAnnouncements);
             setAnnouncements(tempAnnouncements);
             
         }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [community._id])
    return (
        <Card>
        <CardHeader color="success">
          <h2 className={classes.cardTitleWhite}>Announcements</h2>
         
        </CardHeader>
        <CardBody>
            {user.type==='admin'?            
        <AnnouncementTable
            tableHeaderColor="success"
            tableHead={["Announcement", "View", "Edit", "Delete"]}
            tableData={announcements}/>
            :
            <AnnouncementTable
            tableHeaderColor="success"
            tableHead={["Announcement", "View"]}
            tableData={announcements}/>
            }
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
  
