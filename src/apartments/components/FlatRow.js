import { Grid, IconButton, TextField } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
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
export const FlatRow = ({...props}) => {
    console.log(props.flat);
    const [oldValue,setOldValue]=React.useState(props.flat)

    const [flat,setFlat]=React.useState(props.flat)
    const classes=useStyles();
    const[disabled,setDisabled]=React.useState(true);
   
    React.useEffect(() => {
        setFlat(props.flat)
        return () => {
            setFlat(null);
        }
    }, [props.flat,props.flat.model.name])
    const onSave=()=>{
        console.log('save clicked');
        console.log(flat);
        setDisabled(disabled=>!disabled);
        props.saveRow(flat);
    }
    const onEdit=()=>{
        console.log('edit clicked');
        console.log(flat);
        setOldValue(flat);
        setDisabled(disabled=>!disabled);
    }
    const onCancel=()=>{
        console.log('cancel clicked');
        console.log(flat);
        setFlat(oldValue);
        setDisabled(disabled=>!disabled);
    }

    const setFlatNumValue=(e)=>{
        e.preventDefault();

        const value=e.target.value;
        setFlat({...flat,'aptnum':value});
    }
    const getModel=(modelid)=>{
        console.log( props.models);
        console.log(modelid);
        const model= props.models.filter((model)=>model._id===modelid);
        return model[0];
           
     
    }
    const setFlatModelValue=(e)=>{
        e.preventDefault();
        const modelid=e.target.value;
        console.log(modelid);
        const modelInfo=getModel(modelid);
        console.log(modelInfo)
        let value={};
        value['name']=modelInfo.name;
        value['area']=modelInfo.area;
        value['rooms']=modelInfo.rooms
        setFlat({...flat,'model':value});
    }
  
    const setFlatStatusValue=(e)=>{
        e.preventDefault();

        const value=e.target.value;
        setFlat({...flat,'status':value});
    }
    const setFlatEmailValue=(e)=>{
        e.preventDefault();

        const value=e.target.value;
        setFlat({...flat,'email':value});

    }
   
    return (
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
            <TextField disabled={disabled} className={classes.formControl} variant="outlined" name="flatnum"  onChange={setFlatNumValue} value={flat.aptnum}/>
            <FormControl variant="outlined"  className={classes.formControl}>
                        <Select  disabled={disabled} value={flat==null?null:flat.model._id}  onChange={setFlatModelValue} >
                       {props.models.map((model)=>
                       {
                            return <MenuItem value={model._id}>{model.name}</MenuItem>
                       })}     
                        
                       </Select>
                    </FormControl>
            <FormControl variant="outlined"  className={classes.formControl}>
                        <Select  disabled={disabled} value={flat.status}  onChange={setFlatStatusValue} >
                        <MenuItem value='vacant'>Vacant</MenuItem>
                         <MenuItem value='self-occupied'>Self-Occupied</MenuItem>
                         <MenuItem value='rented out'>Rented Out</MenuItem>

                         <MenuItem value='not-sold'>Not Sold</MenuItem>


                        </Select>
                    </FormControl>
                    <TextField  disabled={disabled}  className={classes.formControl}   variant="outlined"  name="flatemail" onChange={setFlatEmailValue} value={flat.email} />

    {props.isNew?
        !disabled?
          <div>   <IconButton onClick ={onSave} aria-label="save">
             <SaveIcon />
           </IconButton>
           <IconButton onClick={onCancel} aria-label="cancel">
             <CancelIcon />
           </IconButton>
           </div>
   
        :
        
        <div>
            <IconButton onClick={onEdit} aria-label="edit">
          <EditIcon />
        </IconButton>
       
      </div>
        
        :
        null
    }
        
    </Grid>
    )
}
