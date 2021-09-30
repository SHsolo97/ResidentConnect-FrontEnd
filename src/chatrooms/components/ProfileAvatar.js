import React from 'react';
import { Avatar } from '@material-ui/core';

  
const ProfileAvatar = ({ ...avatarProps }) => {
    
    return (
        <Avatar {...avatarProps}  />
        
    );
}

export default ProfileAvatar;