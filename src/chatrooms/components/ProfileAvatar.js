import React from 'react';
import { getNameInitials } from '../../misc/helpers';
import { Avatar } from '@material-ui/core';

  
const ProfileAvatar = ({ ...avatarProps }) => {
    
    return (
        <Avatar {...avatarProps}  />
        
    );
}

export default ProfileAvatar;