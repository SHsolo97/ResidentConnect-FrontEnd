import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';

import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha('#FF9800', 0.15),
      '&:hover': {
        backgroundColor: alpha('#FF9800', 0.25),
      },
     
      width: '50ch'
      
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color:'#000000'
      
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '50ch',
        '&:focus': {
          width: '50ch',
        },
      },
    },
  }));

  
export const MyAdFilter = ({...props}) => {
    const classes=useStyles();

    const handleChange = (event, newSelection) => {
      //console.log(newSelection);
      props.setAdFilter(newSelection);
    };
    const setSearchFilter=(event)=>
    {
      if (event.key === 'Enter') {
      //console.log(event.target.value);
      props.setAdsearchFilter(event.target.value);
      }
    }
     return (
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
        <div>
           <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…" onKeyDown={setSearchFilter}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          
          <ToggleButtonGroup  exclusive    value={props.filter} onChange={handleChange} style={{marginTop:'50px'}}  color='#00FF00' >
             <ToggleButton value="active" key="active" >Active Ads</ToggleButton>
                 
              <ToggleButton value="expired" key="expired" >InActive Ads</ToggleButton>
       
      </ToggleButtonGroup>
        </div>
        </Grid>
    )
}
