import React, { memo,useEffect,useState } from 'react';
import { useCurrentRoom } from '../../../../context/currentroom.context';
import { useModelState } from '../../../../misc/custom-hooks';
import {PrimaryButton} from '../../../../shared/components/PrimaryButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {  Dialog, IconButton } from '@material-ui/core';
import { SectionHeader } from '../../../../shared/components/SectionHeader';
import { useProfile } from '../../../../context/profile.context';
import { database } from '../../../../misc/firebase';
import { transformArrWithId } from '../../../../misc/helpers';
import RequestsTable from './RequestsTable';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useCommunity } from '../../../../context/community.context';

const RequestInfoBtnModal = () => {
    const { isOpen, open, close } = useModelState();
   // const description = useCurrentRoom(v => v.description);
    const name = useCurrentRoom(v => v.name);
    const id= useCurrentRoom(v => v.id);
    const {user}=useProfile();
    //const communityid=user.communities[0];
    const {community}=useCommunity();
    const communityid=community._id;
    const [requests,setRequests]=useState([]);
    useEffect(() => {
        const reqListRef = database.ref(`/requests/${communityid}/${id}`);
        reqListRef.on('value', (snap) => {
            const data = transformArrWithId(snap.val());
            setRequests(data)
            console.log(data);
        });

        
    },[id,communityid]);

   

    const approveRequest=async (reqid)=>{
        console.log('approve request');
        database.ref(`/requests/${communityid}/${id}/${reqid}`).child('status').set('Approved').then(() => {
            console.log('Successfully Updated');
        }).catch(err => {
            console.log(err.message);
        })
        const newdata={
            approvedby:{
                name: user.firstname + ' ' + user.lastname,
                uid: user.uid,
                ...(user.avatar ? { avatar: user.avatar } : {})
                },
        }
        
        const reqRef = database.ref(`/requests/${communityid}/${id}/${reqid}`);
        await reqRef.update(newdata);
        let reqdata=null;
        reqRef.on('value', (snap) => {
            reqdata =snap.val();
            
        });
        
        const memberRef = database.ref(`/rooms/${communityid}/${id}/members`);
      
        await memberRef.transaction(members => {
            if (members) {
               
                members[reqdata.raisedby.uid] = true;
                   
               
            }
            return members;
        })
      
      }
      const declineRequest=async(reqid)=>{
        console.log('decline request');
        database.ref(`/requests/${communityid}/${id}/${reqid}`).child('status').set('Declined').then(() => {
            console.log('Successfully Updated');
        }).catch(err => {
            console.log(err.message);
        })

        const newdata={
            declinedby:{
                name: user.firstname + ' ' + user.lastname,
                uid: user.uid,
                ...(user.avatar ? { avatar: user.avatar } : {})
                },
        }
        
        const reqRef = database.ref(`/requests/${communityid}/${id}/${reqid}`);
        await reqRef.update(newdata);
      }
    return (
        <>
        <IconButton onClick={open}  color="primary" aria-label="Add members">
           <PersonAddIcon />
           </IconButton>


            <Dialog open={isOpen} maxWidth='xl' onClose={close}>
                <SectionHeader>  {name} </SectionHeader>
                <DialogContent>
                  
                   <RequestsTable approveRequest={approveRequest}  declineRequest={declineRequest} requests={requests} />

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

export default memo(RequestInfoBtnModal);