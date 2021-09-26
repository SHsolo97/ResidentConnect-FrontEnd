import React from 'react'
import ActivePollingListTable from './ActivePollingListTable'
import {ShowPollDetails} from './ShowPollDetails';

export const  PollingsList  =({...props})=>{

    const[selectedPoll,setSelectedPoll]=React.useState(null);
      
    const selectPoll=(data)=>{
        console.log(data);
        setSelectedPoll(data);
    }
    return (
    <div>
        <ActivePollingListTable selectPoll={selectPoll} polls={props.polls} />
        <ShowPollDetails poll={selectedPoll} />
    </div>);

}
