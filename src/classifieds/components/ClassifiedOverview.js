import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PhoneIcon from '@material-ui/icons/Phone';
import { useCurrentClassified } from '../../context/currentclassified.context';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import {useModelState} from '../../misc/custom-hooks';
import MapModel from '../../shared/components/Maps/MapModal';
import {getGeoOrdinates} from '../../misc/map-helper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ClassifiedOverview() {
  const { isOpen, open, close } = useModelState();
  const [coordinates,setCoordinates]=React.useState(null);
  const classes = useStyles();
  const thumbnail = useCurrentClassified(v => v.thumbnail);
  const address = useCurrentClassified(v => v.address);
  const name = useCurrentClassified(v => v.name);
  const phones = useCurrentClassified(v => v.phone);
  const emails = useCurrentClassified(v => v.emails);
  const showMap=async ()=>{
    const completeAddress=`${address.addressline},${address.area},${address.city},${address.state},${address.pincode}, India`
   // console.log(completeAddress);
      const response= await getGeoOrdinates({address:completeAddress});
   //   console.log(response);
          setCoordinates(response);
          open();

  }
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={thumbnail} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h4" style={{ color: 'blue' }}>
                {name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {address.addressline} , {address.area} , {address.city}, {address.state} , {address.pincode} </Typography>
              <Grid item xs container direction="row" justifyContent="space-between" spacing={2}>
                <div>
                  {phones.map(phone => (
                    <Typography variant="body1">
                      <PhoneIcon fontSize="small" /> {phone.number}
                    </Typography>
                  ))
                  }
                  {emails.map(email => (
                    email !== null &&
                    <Typography variant="body1">
                      <EmailIcon fontSize="small" />   {email}
                    </Typography>
                  ))}
                </div>
                <Button onClick={showMap} style={{ color: 'blue' }}>Map</Button>
                {isOpen &&
            <MapModel coordinates={coordinates}  zoom={10} open={isOpen} handleClose={close}  />}
              </Grid>
            </Grid>


          </Grid>

        </Grid>
      </Grid>
    </div>
  );
}