import {  Dialog, DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import React from 'react';
import { useModelState } from '../../../../misc/custom-hooks';
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import ProfileAvatar from '../../ProfileAvatar';
import Button from '@mui/material/Button';
import { useCurrentRoom } from '../../../../context/currentroom.context';
import { auth } from '../../../../misc/firebase';

const ProfileInfoBtnModal = ({ profile, handleAdmin,children,...btnProps }) => {
    const { isOpen, close, open } = useModelState();
    const { name, avatar } = profile;
    const shortName = name.split(' ')[0];
    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);
 
    const isMessageAuthorAdmin = admins?admins.includes(profile.uid):false;
    const isAuthor = auth.currentUser.uid === profile.uid;
    
    const canGrantAdmin = isAdmin && !isAuthor;
//    const memberSince = new Date(createdAt).toLocaleDateString();
    return (
        <>
            <Button  onClick={open} >
                {shortName} 
            </Button>
            <Dialog maxWidth='md' fullWidth='true' open={isOpen} onClose={close}>
            <DialogTitle>{shortName}'s profile</DialogTitle>
              
              <DialogContent>
              <ProfileAvatar src={avatar} alt={shortName} fontSize="large"/>
                   <h4 >{name} </h4>
                 
              </DialogContent>
              <DialogActions>
              {canGrantAdmin &&
        <PrimaryButton onClick={()=> handleAdmin(profile.uid)} >
          {isMessageAuthorAdmin ? 'Remove admin permission' : 'give admin permission'}
        </PrimaryButton>
        }
                  <PrimaryButton onClick={close} >
                      Close
                  </PrimaryButton>
              </DialogActions>
              
            </Dialog>
          
        </>
        );
        }

export default ProfileInfoBtnModal;