import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite';
import { useModelState } from '../../../../misc/custom-hooks';
import { storage } from '../../../../misc/firebase';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog } from '@material-ui/core';
import { uploadFilesToFireStorage } from '../../../../misc/firestore';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import { useCurrentRoom } from '../../../../context/currentroom.context';

const MAX_FILE_SIZE = 1000 * 1024 * 5;


const AttachmentBtnModal = ({afterUpload}) => {
    //const { chatId } = useParams();
    const chatId = useCurrentRoom(v => v.id);
    const { isOpen, close, open } = useModelState();
    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const onChange = (fileArr) => {

        const filtered = fileArr.filter(el => el.blobFile.size <= MAX_FILE_SIZE).slice(0, 5);
        setFileList(filtered);
    }
    const onUpload=async ()=>
    {
        setIsLoading(true);
        const path=`/chat/${chatId}`;        
        const files = await  uploadFilesToFireStorage(path,fileList);
        await afterUpload(files);
        setIsLoading(false);
        close();
    }
    /*const onUpload = async () => {
        try {
            setIsLoading(true);
            const uploadPromises = fileList.map(f => {
                return storage
                    .ref(`/chat/${chatId}`)
                    .child(Date.now() + f.name)
                    .put(f.blobFile,
                        {
                            cacheControl: `public, max-age=${3600 * 12 * 3}`,
                        });

            });
            const uploadSnapshots = await Promise.all(uploadPromises);
            const shapePromises = uploadSnapshots.map(async snap => {
                return {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
                    url: await snap.ref.getDownloadURL()
                }
            })

            const path=`/chat/${chatId}`;
               uploadImagesToFireStorage(fileList);
            const files = await Promise.all(shapePromises);
            await afterUpload(files);
            setIsLoading(false);
            close();
        }

        catch (err) {
            setIsLoading(false);
            Alert.error(err.message, 5000);
        }
    }
*/
    return (
        <>
            <IconButton aria-label="attach" onClick={open}>
          <AttachFileIcon />
            </IconButton>
            <Dialog open={isOpen} onClose={close}>
                <DialogTitle>Upload Image </DialogTitle>
                <DialogContent>
                <Uploader
                        autoUpload={false}
                        action=""
                        fileList={fileList}
                        onChange={onChange}
                        multiple
                        listType="picture-text"
                       
                        />
                </DialogContent>
                <DialogActions>
                    <PrimaryButton disabled={isLoading} type ="submit"   onClick={onUpload}>
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

export default AttachmentBtnModal;