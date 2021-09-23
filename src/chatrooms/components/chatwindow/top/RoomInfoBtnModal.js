import React, { memo } from 'react';
import { useCurrentRoom } from '../../../../context/currentroom.context';
import { useModelState } from '../../../../misc/custom-hooks';
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog } from '@material-ui/core';
import { SectionHeader } from '../../../../shared/components/SectionHeader';
import { Link } from '@material-ui/core';
const RoomInfoBtnModal = () => {
    const { isOpen, open, close } = useModelState();
    const description = useCurrentRoom(v => v.description);
    const name = useCurrentRoom(v => v.name);


    return (
        <>
        <Link href="#" onClick={open}>
        Room Information
           </Link>
          

            <Dialog open={isOpen} fullWidth='true' maxWidth='md' onClose={close}>
                <SectionHeader>    About {name} </SectionHeader>
                <DialogContent>
                     <h2>Description </h2>
                    <p>{description} </p>

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

export default memo(RoomInfoBtnModal);