import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
   color:'#3F51B5'
    }
}));

export const SectionHeader = ({children}) => {
    const classes = useStyles();
      return (
         <h2 className={classes.root}>{children}</h2>
    )
}
