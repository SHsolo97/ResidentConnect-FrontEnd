/* eslint-disable default-case */
import React,{useState, useEffect} from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import {TextField,Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import PrimaryButton from '../../shared/components/PrimaryButton';
import Link from '@material-ui/core/Link';
import { useModelState } from '../../misc/custom-hooks';
import TimeSlotModal from '../components/TimeSlotModal';
import TimeSlotArray from '../components/TimeSlotArray';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export const AddFacility = () => {
    const history=useHistory();
    const [faciltyTypes,setFacilityTypes]=useState([]);
    const[day,setDay]=useState('Monday');
    const [timeSlotChipPerDay, setTimeSlotChipPerDay] = React.useState(
        [{day:'Monday',chips:[]},
         {day:'Tuesday',chips:[]},
         {day:'Wednesday',chips:[]},
         {day:'Thursday',chips:[]},
         {day:'Friday',chips:[]},
         {day:'Saturday',chips:[]},
         {day:'Sunday',chips:[]}
          ]
            );

    const [timeSlotChip, setTimeSlotChip] = React.useState([]);
    const[bookingDetails,setBookingDetails]=useState(
        {
           
            isclosed:false,
            opentime:'',
            closetime:'',
            slots:[
                   {
                    starttime:{type:String},
                    endTime:{type:String}
                  }
            ]
            
        });
    
        useEffect(() => {
            
            console.log(`inside use effect ${day} `);
            let timings= null;
            switch(day)
            {
            case "Monday":
                setBookingDetails(facility.timings[0]);
                 setTimeSlotChip(timeSlotChipPerDay[0].chips);

                 break;
            case "Tuesday":
               
                setBookingDetails(facility.timings[1]);
                setTimeSlotChip(timeSlotChipPerDay[1].chips);

                break;
            case "Wednesday":
               
                setBookingDetails(facility.timings[2]);
                setTimeSlotChip(timeSlotChipPerDay[2].chips);

                break;
            case "Thursday":
                
                
                setBookingDetails(facility.timings[3]);
                setTimeSlotChip(timeSlotChipPerDay[3].chips);

                break;
            case "Friday":
               
                setBookingDetails(facility.timings[4]);
                setTimeSlotChip(timeSlotChipPerDay[4].chips);

                break;
            case "Saturday":
                setBookingDetails(facility.timings[5]); 
                setTimeSlotChip(timeSlotChipPerDay[5].chips);
                break;
            case "Sunday":
               
                setBookingDetails(facility.timings[6]) 
                setTimeSlotChip(timeSlotChipPerDay[6].chips);
                break;
        }
       console.log(timeSlotChip);
     
          
        }, [day])
       
        const [facility,setFacility]=useState({
        type:'',
        name:'',
        details:'',
        bookingtype:'',
        rent:0,
        timings:
        [
            {Monday:{
                
                isclosed:false,
                opentime:'',
                closetime:'',
                slots:
                [
                    {starttime:{type:String},
                    endTime:{type:String}}
                ]
            }}
            ,
            {Tuesday:{
                
                isclosed:false,
                opentime:'',
                closetime:'',
                slots:
                [
                    {starttime:{type:String},
                    endTime:{type:String}}
                ]
            }},
            {Wednesday:{
                
                isclosed:false,
                opentime:'',
                closetime:'',
                slots:
                [
                    {starttime:{type:String},
                    endTime:{type:String}}
                ]
            }},
            {Thursday:{
                
                isclosed:false,
                opentime:'',
                closetime:'',
                slots:
                [
                    {starttime:{type:String},
                    endTime:{type:String}}
                ]
            }},
            {Friday:{
                
                isclosed:false,
                opentime:'',
                closetime:'',
                slots:
                [
                    {starttime:{type:String},
                    endTime:{type:String}}
                ]
            }},
            {Saturday:{
                
                isclosed:false,
                opentime:'',
                closetime:'',
                slots:
                [
                    {starttime:{type:String},
                    endTime:{type:String}}
                ]
            }},
            {Sunday:{
               
                isclosed:false,
                opentime:'',
                closetime:'',
                slots:
                [
                    {starttime:{type:String},
                    endTime:{type:String}}
                ]
            }}
        ]
            
        
    });
    const setFacilityType=(event)=>{
        setFacility((prevState)=>{
            return{...prevState,type:event.target.value}});
    }

    useEffect(() => {
        
        getFacilityTypes();
    }, [])

    const getFacilityTypes=async()=>{
        
        var apiBaseUrl = `http://localhost:4008/api/facilities/faciltytypes`        
        await axios.get(apiBaseUrl )
             .then(function (response) {
                 if (response.status === 200)
                {           
                  
                    setFacilityTypes(response.data.facilityTypes);
                }
           
             })
             .catch(function (error) {
                 console.log(error);
                 return(null);
    
             });
    }
 
    const setBookingDay=(event)=>{

        console.log(`previous day: ${day}`);
        switch(day)
        {
            case 'Monday':
                setTimeSlotChipPerDay(timeSlotChipPerDay=>({
                    ...timeSlotChipPerDay,
                    [0]: timeSlotChip
                 }))
                break;
            case 'Tuesday':
                setTimeSlotChipPerDay(timeSlotChipPerDay=>({
                    ...timeSlotChipPerDay,
                    [1]: timeSlotChip
                 }))
                break;
            case 'Wednesday':
                setTimeSlotChipPerDay(timeSlotChipPerDay=>({
                    ...timeSlotChipPerDay,
                    [2]: timeSlotChip
                 }))
                break;
            case 'Thursday':
                setTimeSlotChipPerDay(timeSlotChipPerDay=>({
                    ...timeSlotChipPerDay,
                    [3]: timeSlotChip
                 }))
                break;
            case 'Friday':
                setTimeSlotChipPerDay(timeSlotChipPerDay=>({
                    ...timeSlotChipPerDay,
                    [4]: timeSlotChip
                 }))
                break;
            case 'saturday':
                setTimeSlotChipPerDay(timeSlotChipPerDay=>({
                    ...timeSlotChipPerDay,
                    [5]: timeSlotChip
                 }))
                break;
            case 'Sunday':
                setTimeSlotChipPerDay(timeSlotChipPerDay=>({
                    ...timeSlotChipPerDay,
                    [6]: timeSlotChip
                 }))
                break;
        }
        console.log(timeSlotChip);
        setDay(event.target.value);
       
    
       

    }
    const setFacilityName=(event)=>{
        setFacility((prevState)=>{
            return{...prevState,name:event.target.value}});
      }
      const setFacilityDetails=(event)=>{
        setFacility((prevState)=>{
            return{...prevState,details:event.target.value}});
      }
      const handleCancel=(event)=>{
          history.push('/facilityA');
      }
      const addFacility=(event)=>{
          console.log('Add Facility');
      }

     
    return (
        <>
           <PageHeader>Add Facility</PageHeader> 
           <Grid
  container
  direction="column"
  justifyContent="space-evenly"
  alignItems="flex-start"
> <FormControl style={{  width: '50ch'}}   variant="outlined">
        <InputLabel id="label-category">Category</InputLabel>
        <Select id="type"  value={facility.type}  onChange={setFacilityType} label="Category">
        {faciltyTypes.map((facilitytype)=>            
          <MenuItem key={facilitytype.id} name={facilitytype.facilitytype} value={facilitytype.id}>{facilitytype.facilitytype}</MenuItem>
        )}
          </Select>
      </FormControl>
      <div>
      <TextField id="facilityname" style={{ width: '100ch'}}    margin="normal" label="Facility Name" value={facility.name} onChange={setFacilityName} variant="outlined"/>
      </div>
      <TextField id="facilitydetails"  multiline rows={10} style={{  width: '160ch'}}   margin="normal"  label="Facility Details" value={facility.details} onChange={setFacilityDetails} variant="outlined"/>
       <FormControl  style={{  }}>
        <InputLabel id="inpit-bokkingday">Day</InputLabel>
        <Select labelId="lbl-bookingday" id="lbl-bookingday"  value={day}  variant="outlined"  onChange={setBookingDay} >     
          <MenuItem value='Monday'>Monday</MenuItem>
          <MenuItem value='Tuesday'>Tuesday</MenuItem>
          <MenuItem value='Wednesday'> Wednesday</MenuItem>
          <MenuItem value='Thursday'> Thursday </MenuItem>
          <MenuItem value='Friday'>Friday</MenuItem>
          <MenuItem value='Saturday'> Saturday</MenuItem>
          <MenuItem value='Sunday'> Sunday </MenuItem>
        </Select>
        </FormControl>
      
     
        <Grid  container direction="row" justifyContent="center" alignItems="center">
        <PrimaryButton onClick={addFacility}>Submit</PrimaryButton>
       <PrimaryButton onClick={handleCancel}>Cancel</PrimaryButton>
       </Grid>
     
      </Grid>
       </>
    )
}
