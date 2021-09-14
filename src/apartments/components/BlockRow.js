import { Grid, IconButton, TextField } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { SettingsBackupRestoreSharp } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
export const BlockRow = ({...props}) => {
    const [oldValue,setOldValue]=React.useState(props.block)

    const [block,setBlock]=React.useState(props.block)
    const classes=useStyles();
    const[disabled,setDisabled]=React.useState(true);
    React.useEffect(() => {
        setBlock(props.block)
        return () => {
            setBlock([]);
        }
    }, [props.block])
    const onSave=()=>{
        //console.log('save clicked');
       // console.log(block);
        setDisabled(disabled=>!disabled);
        props.saveRow(block);
    }
    const onEdit=()=>{
       // console.log('edit clicked');
      //  console.log(block);
        setOldValue(block);
        setDisabled(disabled=>!disabled);
    }
    const onCancel=()=>{
        //console.log('cancel clicked');
       // console.log(block);
        setBlock(oldValue);
        setDisabled(disabled=>!disabled);
    }
    const onDelete=()=>{
       // console.log('delete clicked');
        //console.log(block);
        props.deleteRow(block.key);
    }
    const setBlockValue=(e)=>{
        e.preventDefault();

        const value=e.target.value;
        setBlock({...block,'block':value});
    }

    const setFloorsValue=(e)=>{
        e.preventDefault();

        const value=e.target.value;
        setBlock({...block,'floors':value});
    }
    const setFlatsValue=(e)=>{
        e.preventDefault();

        const value=e.target.value;
        setBlock({...block,'flats':value});
    }
    return (
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
            <TextField disabled={disabled} className={classes.formControl} variant="outlined" name="block"  onChange={setBlockValue} value={block.block}/>
            <TextField  disabled={disabled}  className={classes.formControl}   variant="outlined" name="floors"  onChange={setFloorsValue} value={block.floors}/>
            <TextField  disabled={disabled}  className={classes.formControl}   variant="outlined"  name="flats" onChange={setFlatsValue} value={block.flats} />
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
        <IconButton onClick={onDelete} aria-label="delete">
        <DeleteIcon />
      </IconButton>
      </div>
        
        :
        null
    }
        
    </Grid>
    )
}
