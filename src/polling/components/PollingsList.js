import React from 'react'
import ActivePollingListTable from './ActivePollingListTable'
import ClosedPollingListTable from './ClosedPollingListTable'
import {SectionHeader} from '../../shared/components/SectionHeader';
import {ShowPollDetails} from './ShowPollDetails';

export const  PollingsList  =({...props})=>{

    const[selectedPoll,setSelectedPoll]=React.useState(null);
      
    const selectPoll=(data)=>{
        console.log(data);
        setSelectedPoll(data);
    }
    return (
    <div>
        <SectionHeader> Active Polls </SectionHeader>
        <ActivePollingListTable selectPoll={selectPoll} polls={props.activepolls} />
        <SectionHeader> Closed Polls </SectionHeader>

        <ClosedPollingListTable selectPoll={selectPoll} polls={props.closedpolls} />
        <ShowPollDetails poll={selectedPoll} />
    </div>);

}
