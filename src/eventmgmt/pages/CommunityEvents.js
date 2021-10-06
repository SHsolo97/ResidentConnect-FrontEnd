import React from 'react'
import EventFilter from '../components/eventFilter'
import LocalEvents from "../components/localEvents"
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const CommunityEvents = () => {
    const history=useHistory();
    const addEvent=()=>
    {
        history.push('/addEvent');
    }
    return (
        <div ClassName="eventManagement" >
        <h1 style={{ color:"#3f51b5" }}>Events<Button
        variant="contained"
        style ={{backgroundColor:"#303f9f", color:"white",  position:"relative", left:"780px", }}
        startIcon={<AddCircleOutlineIcon />} onClick={addEvent}>Add Events</Button></h1>
        <EventFilter />
        <LocalEvents heading="Hosted Events"/>
        <LocalEvents heading="Enrolled Events"/>
        <LocalEvents heading="Community Events" />
        <LocalEvents heading="Local Events" />
        </div>
    )
}

export default CommunityEvents;
