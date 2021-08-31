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


export const AddFacility = () => {
    
    const [faciltyTypes,setFacilityTypes]=useState([]);
    const[day,setDay]=useState('Monday');
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

        let timings= null;
        console.log(event.target.value);
        setDay(event.target.value);
        // eslint-disable-next-line default-case
        switch(event.target.value)
        {
            case "Monday":
                console.log(event.target.value);
                 timings=facility.timings[0];
                 break;
            case "Tuesday":
               
                console.log(event.target.value);
                timings=facility.timings[1]; 
                break;
            case "Wednesday":
                console.log(event.target.value);
               
                timings=facility.timings[2]; 
                break;
            case "Thursday":
                console.log(event.target.value);
                
                timings=facility.timings[3]; 
                break;
            case "Friday":
                console.log(event.target.value);
               
                timings=facility.timings[4]; 
                break;
            case "Saturday":
                console.log(event.target.value);
                timings=facility.timings[5]; 
                break;
            case "Sunday":
                console.log(event.target.value);
               
                timings=facility.timings[6]; 
                break;
        }
        setBookingDetails(timings);
       
        console.log(timings);
        console.log(bookingDetails);

    }
    const setFacilityName=(event)=>{
        setFacility((prevState)=>{
            return{...prevState,name:event.target.value}});
      }
      const setFacilityDetails=(event)=>{
        setFacility((prevState)=>{
            return{...prevState,details:event.target.value}});
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
      </Grid>
       </>
    )
}
