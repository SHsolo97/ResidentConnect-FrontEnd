import React from 'react'
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(50),
    marginRight: theme.spacing(1),
    width: '50ch',
  },
}));

const ResidentProfileSetting = () => {
    const {user}=useProfile();
    const classes = useStyles();
    return (
        <>
         <PageHeader>Profile</PageHeader>
         <SectionHeader>Basic Details</SectionHeader>
         <div className={classes.root}>
       <TextField
          id="firstname"
          label="First Name"
          className={classes.textField}
          placeholder="first name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

<TextField
          id="lastname"
          label="last Name"
          className={classes.textField}
          placeholder="last name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          placeholder="Email"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="phone"
          label="Phone"
          className={classes.textField}
          placeholder="phone"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="bloodgroup"
          label="Blood Group"
          className={classes.textField}
          placeholder="Blood Group"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
       
        </div>
         <SectionHeader>Emergency Contact Details</SectionHeader>
         <div className={classes.root}>
       <TextField
          id="firstname"
          label="First Name"
          className={classes.textField}
          placeholder="first name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

<TextField
          id="lastname"
          label="last Name"
          className={classes.textField}
          placeholder="last name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          placeholder="Email"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="phone"
          label="Phone"
          className={classes.textField}
          placeholder="phone"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="bloodgroup"
          label="Blood Group"
          className={classes.textField}
          placeholder="Blood Group"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
       
        </div>
        </>
    )
}
export default ResidentProfileSetting; 
