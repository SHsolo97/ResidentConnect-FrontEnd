import React, { useCallback, useState, useRef} from 'react';
import firebase from 'firebase/app';
import { useModelState } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { Dialog } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { useProfile } from '../../context/profile.context';
import Alert from '@material-ui/lab/Alert';
import { useCommunity } from '../../context/community.context';

const INITIAL_FORM = {
    name: '',
    description:''
}



const CreateRoomBtnModal = () => {
    
    const { isOpen, open, close } = useModelState();
    const [formValue, setFormValue] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef();
    const {user}=useProfile();
    //const communityid=user.communities[0];
    const {community}=useCommunity();
    const communityid=community._id;
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
   
    const onSubmit = async () => {
        
        console.log(formValue);
        setIsLoading(true);
        const newRoomdata = {
            ...formValue,
            communityid:communityid,
            
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            admins: {
                [auth.currentUser.uid]: true
            },
            members: {
                [auth.currentUser.uid]: true
            }
        }
        ;
        try {
            await database.ref(`rooms/${communityid}`).push(newRoomdata);

            setIsLoading(false);
            setFormValue(INITIAL_FORM);
            close();

           
        }
        catch (err) {
            setIsLoading(false);
            
        }
    }

    return (
        <div style={{marginTop:'10px'}}>
            <PrimaryButton block color="green" onClick={open}>
             <EmojiObjectsIcon /> Create new Chat Room
            </PrimaryButton>

            <Dialog open={isOpen} onClose={close}>
                <DialogTitle>
                    New Chat Room

                </DialogTitle>
                <DialogContent>
                    <form fluid   formValue={formValue}  ref={formRef}>
                    <TextField  onChange={onNameChange}  value={formValue.name} name="name" style={{ margin: 8, width: '50ch'}}    margin="normal" label="Room Name" variant="outlined"/>
                    <TextField onChange={onDescriptionChange} name="description" value={formValue.description}   style={{ margin: 8 , width: '50ch'}}   margin="normal"  label="Description" variant="outlined"/>   
                        
                    </form>

                </DialogContent>
                <DialogActions>
                    <PrimaryButton type ="submit"  onClick={onSubmit}>
                        Create new Chat Room
                    </PrimaryButton>
                    <PrimaryButton onClick={close} >
                        Cancel
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
        </div>
        );
        }

export default CreateRoomBtnModal;