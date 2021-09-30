import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../images/home/logo.png';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { auth } from '../misc/firebase';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
export const SettingsLayout = ({children}) => {
    const classes = useStyles();
    const history=useHistory();

    const signOut=()=>{
        auth.signOut().then(() => {
          history.push('/signin');
      }).catch((error) => {
        console.log(error);
      });
        }
        return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center">

                        <img  alt="logo" src={logo} />
                        <Typography variant="h6" noWrap>
                            Residents Connect
                        </Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-end" alignItems="center">

                        <div className={classes.sectionDesktop}>


                            <IconButton color="inherit" edge="end" onClick={signOut}>
                                <ExitToAppIcon />
                            </IconButton>

                        </div>
                    </Grid>
                </Toolbar>

            </AppBar>
            <Container>
                {children}
            </Container>
        </div>
    )
}