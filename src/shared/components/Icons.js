import * as React from 'react';
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import Users from '../../images/icons/Users.svg';

export function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export function UsersIcon(props) {
    return (
     {Users}
    );
  }