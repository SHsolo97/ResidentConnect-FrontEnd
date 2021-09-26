import React, { useState } from 'react';

import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { storage } from '../../../../misc/firebase';
import { IconButton } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import { useModelState } from '../../../../misc/custom-hooks';
import RecordAudio from './RecordAudio';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog } from '@material-ui/core';
import PrimaryButton from '../../../../shared/components/PrimaryButton';

const AudioMsgBtn = ({ afterUpload }) => {
    const { chatId } = useParams();
    const { isOpen, close, open } = useModelState();
    //const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsuploading] = useState(false);
    const [audios,setAudios]=useState([]);
    const onUpload =(event)=>{
        console.log(audios);
    }
    const onUpload1 = async (event) => {
        setIsuploading(true);
        try {
            const snap = await storage
                    .ref(`/chat/${chatId}`)
                    .child(`audio_${Date.now()}.mp3`)
                    .put(audios[0].blob,
                        {
                            cacheControl: `public, max-age=${3600 * 12 * 3}`,
                        });
            const file = {
                contentType: snap.metadata.contentType,
                name: snap.metadata.name,
                url: await snap.ref.getDownloadURL()
            }
            afterUpload([file]);
            setIsuploading(false);
            

        }
        catch (err) {
            setIsuploading(false);
            Alert.error(err.message, 5000);
        }
    }

    return (
        <>
            <IconButton  disabled={isUploading} onClick={open} >
            <MicIcon/>
                           
            </IconButton>
            <Dialog open={isOpen} onClose={close}>
                <DialogTitle>Record Audio </DialogTitle>
                <DialogContent>
                <RecordAudio  audios={audios} setAudios={setAudios}/>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton type ="submit"   onClick={onUpload}>
                        Send To Chat
                    </PrimaryButton>
                
                    <PrimaryButton onClick={close} >
                        Cancel
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
        </>

    );
}

export default AudioMsgBtn;