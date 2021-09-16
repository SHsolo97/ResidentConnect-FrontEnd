import React, {useState, memo,useRef } from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../../context/currentroom.context';
import { useMediaQuery, useModelState } from '../../../../misc/custom-hooks';
import { database } from '../../../../misc/firebase';
import EditableInput from '../../EditableInput';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import { TextField } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog } from '@material-ui/core';
import { useProfile } from '../../../../context/profile.context';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));
const EditRoomBtnDrawer = () => {
    const classes=useStyles();
    const { isOpen, open, close } = useModelState();
    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);
    console.log(description);
    const formRef = useRef();
    const chatId = useCurrentRoom(v => v.id);
    const {user}=useProfile();
    const communityid=user.communities[0];
    console.log(chatId);
    //const { chatId } = useParams();
    //const isMobile = useMediaQuery(`(max-width:992px)`);
    const onSubmit = (event) => {
        database.ref(`rooms/${communityid}/${chatId}`).child('name').set(formValue.name).then(() => {
            console.log('Successfully Updated');
        }).catch(err => {
            console.log(err.message);
        })
        database.ref(`rooms/${communityid}/${chatId}`).child('description').set(formValue.description).then(() => {
            console.log('Successfully Updated');
        }).catch(err => {
            console.log(err.message);
        })
        close();
    }
    const [formValue, setFormValue] = useState({
        'name':name,
        'description':description
    });
    React.useEffect(() => {
        setFormValue({
            'name':name,
            'description':description});
    }, [name])

    const onNameChange =(event)=>{
        
        setFormValue((prevState)=>{
            return{...prevState,name:event.target.value}});
        console.log(formValue);
    }
    const onDescriptionChange =(event)=> {
        
        setFormValue((prevState)=>{
            return{...prevState,description:event.target.value}});
        console.log(formValue);
    };
    return (
        <div>
                  

            <Avatar onClick={open} className={classes.orange}>A</Avatar>
            <Dialog open={isOpen} onClose={close}>
                <DialogTitle>Edit Chat Room Details - {name} </DialogTitle>
                <DialogContent>
                    <form>
                    <TextField  onChange={onNameChange}  value={formValue.name} name="name" style={{ margin: 8, width: '50ch'}}    margin="normal" label="Room Name" variant="outlined"/>
                    <TextField onChange={onDescriptionChange} name="description" value={formValue.description}   style={{ margin: 8 , width: '50ch'}}   margin="normal"  label="Description" variant="outlined"/>   
                        
                    </form>

                </DialogContent>
                <DialogActions>
                    <PrimaryButton type ="submit"  onClick={onSubmit}>
                        Update
                    </PrimaryButton>
                    <PrimaryButton onClick={close} >
                        Cancel
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
      
         </div>
    );
}

export default memo(EditRoomBtnDrawer);