import React from 'react'
import Avatar from '@mui/material/Avatar';
import { useProfile } from '../../context/profile.context';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const UserInfo = () => {
    const {user}=useProfile();
    // eslint-disable-next-line no-extend-native
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    
    return (
        <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
            <Avatar style={{height:"50px", width:"50px"}} src={user.avatar}/>
            <Typography variant="body1" style={{color:'gray'}} gutterBottom component="div"> {user.firstname.capitalize()} {user.lastname.capitalize()}</Typography>
        </Grid>
    )
}
