import React from 'react'
import Link from '@material-ui/core/Link';
import { useModelState } from '../../misc/custom-hooks';
import TimeSlotModal from '../components/TimeSlotModal';
import TimeSlotArray from '../components/TimeSlotArray';

export const FacilityTiming = ({...props}) => {
    const { isOpen, open, close } = useModelState();
    const[TimingDetailsPerDay,setTimingDetailsPerDay]=React.useState(props.TimingDetailsPerDay);
    const [timeSlotChip, setTimeSlotChip] = React.useState([]);
   const[slotKey,setSlotKey]=React.useState(0);
   const handleAddTimeSlot=(slotToAdd)=>()=>{
    //setChipData((chips) => chips.push(chipToAdd));
    console.log("handleAdd");
    console.log(slotToAdd);
    addTimeSlot(slotToAdd);
  }

  const handleTimeSlotAdd=(value)=>{
    close();
    const chipToAdd={key:slotKey, label:value};
    console.log(chipToAdd);
    addTimeSlot(chipToAdd);
  }
  
  const addTimeSlot=(slotToAdd)=>{
    setTimeSlotChip(SlotChip => [...SlotChip, slotToAdd]);
    console.log(slotToAdd);
    setSlotKey(slotKey+1);
  }
 
  const handleTimeSlotDelete = (slotToDelete) => () => {
    setTimeSlotChip((slots) => slots.filter((slot) => slot.key !== slotToDelete.key));
  };
    return (
        <div>
            
        <Link  component="button" variant="body2" onClick={open}> Add Slot </Link>
        {isOpen && <TimeSlotModal handleClose={close} open={open} addTimeSlot={handleTimeSlotAdd} />}
        <TimeSlotArray timeSlotChip={timeSlotChip} key={slotKey} handleDelete={handleTimeSlotDelete} handleAdd={handleAddTimeSlot} />

        </div>
    )
}
