import React, {useState} from 'react'
import {TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
export const PhoneItem = ({...props}) => {
    const classes = useStyles();
    const [phone,setPhone]=useState({
        number:'',
        type:'',
         starttime:'',
         starttimestamp:'',
         endtime:'',
         endtimestamp:'',


    })
    const handleStartTimeChange=(event)=>{
        setPhone((prevState)=>{
            return{...prevState,starttime:event.target.value}});

    }
    const setPhoneType=(event)=>{
        setPhone((prevState)=>{
            return{...prevState,type:event.target.value}});
    }
    const setPhoneNumber=(event)=>{
        setPhone((prevState)=>{
            return{...prevState,number:event.target.value}});
    }
    const handleEndTimeChange=(event)=>{

        setPhone((prevState)=>{
            return{...prevState,endtime:event.target.value}});
    }
    
    const handleStartTiemstampChange=(event)=>{

        setPhone((prevState)=>{
            return{...prevState,starttimestamp:event.target.value}});
    }

    const handleEndTiemstampChange=(event)=>{

        setPhone((prevState)=>{
            return{...prevState,endtimestamp:event.target.value}});
    }
    return (
        <div>
                   <FormControl variant="outlined"  className={classes.formControl}>
                    <InputLabel id="phonetype">Type</InputLabel>
                        <Select value={phone.type} onChange={setPhoneType} label="Type">
                        <MenuItem value='home'>Home</MenuItem>
                         <MenuItem value='office'>Office</MenuItem>
                        </Select>
                    </FormControl>

                     <TextField id="phonenumber" style={{ margin: 8, width: '20ch'}}   value={phone.number}  onChange={setPhoneNumber}  margin="normal" label="phone"  variant="outlined"/>
                    <FormControl variant="outlined"  className={classes.formControl}>
                    <InputLabel id="starttime">Start Time</InputLabel>
                        <Select value={phone.starttime} onChange={handleStartTimeChange} label="Start Time">
                            <MenuItem value="">
                                <em>None</em>
                             </MenuItem>
                             {[...Array(12)].map((item, i) => <MenuItem value={i}> {i} </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined"  className={classes.formControl}>
                    <InputLabel id="ampm">AM/PM</InputLabel>
                        <Select value={phone.starttimestamp} onChange={handleStartTiemstampChange} label="AM/PM">
                        <MenuItem value='AM'>AM</MenuItem>
                         <MenuItem value='PM'>PM</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl variant="outlined"  className={classes.formControl}>
                    <InputLabel id="endtime">End Time</InputLabel>
                        <Select value={phone.endtime} onChange={handleEndTimeChange} label="End Time">
                            <MenuItem value="">
                                <em>None</em>
                             </MenuItem>
                             {[...Array(12)].map((item, i) => <MenuItem value={i}> {i} </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined"  className={classes.formControl}>
                    <InputLabel id="ampm">AM/PM</InputLabel>
                        <Select value={phone.endtimestamp} onChange={handleEndTiemstampChange} label="AM/PM">
                        <MenuItem value='AM'>AM</MenuItem>
                         <MenuItem value='PM'>PM</MenuItem>
                        </Select>
                    </FormControl>
            

        </div>
    )
}
