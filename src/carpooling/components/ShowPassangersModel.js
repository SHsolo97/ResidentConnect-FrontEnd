import React from 'react'
import DialogActions from '@material-ui/core/DialogActions';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { SectionHeader } from '../../shared/components/SectionHeader';

import  Requester from './Requester';

export const ShowPassangersModel = ({...props}) => {
   //console.log(props.ridereqs);
    return (
             <Dialog open={props.open} maxWidth='md' fullWidth onClose={props.handleclose}>
                <SectionHeader> Passangers Details </SectionHeader>
                <DialogContent>
               
                {props.ridereqs.map(ridereq=>
                {
                    return <Requester ridereq={ridereq}/>
                })}
                
         </DialogContent>
                <DialogActions>
                
                </DialogActions>
                </Dialog>
    )
}
