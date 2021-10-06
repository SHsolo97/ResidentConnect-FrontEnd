import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function AlertBox(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export const Alert = ({children,...props}) => {
  //console.log({children});
  const classes = useStyles();
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.handleClose();
  };

  return (
    <div className={classes.root}>
    
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <AlertBox onClose={handleClose} severity={props.type}>
          {children}
        </AlertBox>
      </Snackbar>
      
     
    </div>
  );
}
