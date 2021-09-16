import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import notificationAPI from '../../misc/axios-calls/notificationAPI';

export const SendTokenModal = ({...props}) => {
    
    const [email,setEmail]=React.useState('');
    const sendMail=()=>{
        const recipient=email;
        const subject='Enroll to Residents Connect'
        const body=`Enroll to resident app (http://127.0.0.1:3000/sigin) using token id ${props.token} for ${props.aptnum}`;
        let data={
            "subject":subject,
             "body":body,
             "recipient":recipient
        }
        notificationAPI.post('/sendMail', data)     
    
        .then(res => {

        }
            )
            .catch(err=>{
                console.log(err);
               
            })
    }
    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Send Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please enter  email address here, to send token : {props.token}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={sendMail} color="primary">
            Send
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        
        </DialogActions>
      </Dialog>
    )
}
