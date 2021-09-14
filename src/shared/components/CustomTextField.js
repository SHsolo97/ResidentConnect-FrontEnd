import { TextField } from "@material-ui/core";
import {  withStyles } from '@material-ui/core/styles';

export const CustomTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'orange',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'orange',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'orange',
        },
        '&:hover fieldset': {
          borderColor: 'blue',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'orange',
        },
      },
    },
  })(TextField);