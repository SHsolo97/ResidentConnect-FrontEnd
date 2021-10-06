import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const styles =   {
    root: {
   color:'#3F51B5'
    }
};
const useStyles = makeStyles(styles);

export const SectionHeader = ({children,...props}) => {
    const classes = useStyles();
      return (
         <h2 className={classes.root} {...props}>{children}</h2>
    )
}
