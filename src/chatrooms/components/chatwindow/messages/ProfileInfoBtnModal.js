import {  Dialog, DialogTitle,DialogContent,DialogActions, Link } from '@material-ui/core';
import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModelState } from '../../../../misc/custom-hooks';
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import ProfileAvatar from '../../ProfileAvatar';

const ProfileInfoBtnModal = ({ profile, children,...btnProps }) => {
    const { isOpen, close, open } = useModelState();
    const { name, avatar,createdAt } = profile;
    const shortName = name.split(' ')[0];

//    const memberSince = new Date(createdAt).toLocaleDateString();
    return (
        <>
            <Link {...btnProps} onClick={open} >
                {shortName}
            </Link>
            <Dialog show={isOpen} onHide={close}>
                <DialogTitle>{shortName} profile</DialogTitle>
              
                <DialogContent>
                <ProfileAvatar src={avatar} alt={shortName} fontSize="large"/>
                     <h4 >{name} </h4>
                   
                </DialogContent>
                <DialogActions>
                  
                    <PrimaryButton onClick={close} >
                        Close
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
          
        </>
        );
        }

export default ProfileInfoBtnModal;