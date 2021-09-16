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
  
    return (
        <div>
                   <FormControl variant="outlined"  className={classes.formControl}>
                    <InputLabel id="phonetype">Type</InputLabel>
                        <Select value={props.phone.type} onChange={(e)=>{props.setPhoneType(e.target.value)}} label="Type">
                        <MenuItem value='home'>Home</MenuItem>
                         <MenuItem value='office'>Office</MenuItem>
                        </Select>
                    </FormControl>

                     <TextField id="phonenumber" style={{ margin: 8, width: '20ch'}}   value={props.phone.number}  onChange={(e)=>{props.setPhoneNumber(e.target.value)}}  margin="normal" label="phone"  variant="outlined"/>
                     <TextField id="phonehours" style={{ margin: 8, width: '20ch'}}   value={props.phone.hours}  onChange={(e)=>{props.setPhoneHours(e.target.value)}}  margin="normal" label="hours"  variant="outlined"/>
                    
            

        </div>
    )
}
