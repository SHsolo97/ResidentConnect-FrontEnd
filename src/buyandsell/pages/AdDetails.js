/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { SectionHeader } from '../../shared/components/SectionHeader'
import {  Paper,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import { PrimaryButton } from '../../shared/components/PrimaryButton'
import { useProfile } from '../../context/profile.context'
import { useModelState } from '../../misc/custom-hooks'
import { DeleteAdvertModal } from '../components/DeleteAdvertModal'
import { ShowSellerProfile } from '../components/ShowSellerProfile'

import { useHistory } from 'react-router-dom'
import { ImageCarousel } from '../components/ImageCarousel'
import buyAndSellAPI from '../../misc/axios-calls/buyAndSellAPI';
import userAPI from '../../misc/axios-calls/userAPI';
import communityAPI from '../../misc/axios-calls/communityAPI';
import Map from '../../shared/components/Maps/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { formatPhone,convertDate } from '../../misc/helpers';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  divImage: {




  },
  ThumbImageView:
  {
    height: '50ch',
    border: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',


  },
  imageView:
  {
    width: '10ch',
    height: '5ch',
    border: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

  },
  imageList: {
    marginLeft: theme.spacing(2),
    flexWrap: 'nowrap',
    height: '10ch',

    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',

  },
  adPrice: {
    width: "50ch",
    padding: '2ch',
    marginTop: '5ch',
 
    borderRadius: '0.5ch',

  },
  adImages: {
    width: "120ch",
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '5ch',
    padding: '1ch',
    borderRadius: '2ch',

  },
  addetails: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '5ch',
    width: "100ch",

    padding: '5ch',
    borderRadius: '2ch',

  },
  thumbnail: {
    marginLeft: '25ch',
    width: '100ch',
    height: '40ch'
  }

}));
export const AdDetails = ({ ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const { advert } = props.location.state
  const { user } = useProfile();
  const [sellerDetails, setSellerDetails] = React.useState({ firstname: '', lastname: '', phone: [{ number: '' }] });
  const { isOpen, open, close } = useModelState();

  const [sellerCommunity, setSellerCommunity] = React.useState( {address:{
    addressline :'',
    area :'',
    city: '',
    state : '',
    pincode : ''
  

},
geo:
{
  lat:0,
  lng:0
}});

  const getSellingAddress = async () => {
    const apiBaseUrl = `/community/${advert.communityid}`
   // console.log(apiBaseUrl);
    await communityAPI.get(apiBaseUrl)
      .then(function (response) {
        if (response.status === 200) {
        // console.log(response.data);
          setSellerCommunity(response.data);
        
        }
      })
      .catch(function (error) {
        console.log(error);

      });
  }
  const getSellerDetails = async () => {
    const apiBaseUrl = `/users/${advert.creator}`
    //console.log(apiBaseUrl);
    await userAPI.get(apiBaseUrl)
      .then(function (response) {
        if (response.status === 200) {
       //   console.log(response.data);
          setSellerDetails(response.data);
         // console.log(sellerDetails);
        }
      })
      .catch(function (error) {
        console.log(error);

      });
  }
  React.useEffect(() => {
    getSellerDetails();
    getSellingAddress();

  }, [])

  const updateAd = async (event) => {
    history.push({
      pathname: '/updateAdDetails',
      state: { currentAdvert: advert }

    })
  }

  const deleteAd = async () => {
    //(`delete ${advert._id}`);
    var apiBaseUrl = `/adverts/${advert._id}`
    await buyAndSellAPI.delete(apiBaseUrl)
      .then(function (response) {
        if (response.status === 200) {
     //     console.log(response.data);
          close();
          history.push('/myads');
        }
      })
      .catch(function (error) {
        console.log(error);

      });
  }
  return (
    <div>
      <PageHeader> {advert.title} </PageHeader>

      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
          <Grid xs={8}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Grid items>
                <ImageCarousel images={advert.images} />
              </Grid>
              <br />
              <br />
              <Grid items>
                <Paper className={classes.addetails}>
                  <Grid container direction="column" justifyContent="center" alignItems="flex-start">

                    <SectionHeader>Description</SectionHeader>
                    <p style={{ whiteSpace: 'pre-line' }}> {advert.description}</p>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={4}>
            <Grid items>
              <Paper elevation={1} className={classes.adPrice}>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <SectionHeader> &#8377; {advert.price.value.toLocaleString('en-IN')}</SectionHeader>
                  
                  <p>{advert.title}</p>
                 
                </Grid>
              </Paper>
              <br /> <br /> <br />
              <Paper elevation={1} className={classes.adPrice}>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <SectionHeader>Sold By</SectionHeader>
                  <div  style={{fontSize:'16px'}}> <PersonIcon/ >  {'  '} {sellerDetails.firstname} {sellerDetails.lastname}
                    <ShowSellerProfile sellerAddress={sellerCommunity} seller={sellerDetails}/>
                  </div>
                  <div style={{fontSize:'16px'}}> <CalendarTodayIcon/>  {'  '}  Posted On : {convertDate(advert.createdat)}</div>
                  <div style={{fontSize:'16px'}}><PhoneIcon/> {'  '} {formatPhone(sellerDetails.phone[0].number)}</div>
                  <Button href="#">Chat with Seller </Button> 
                </Grid>
              </Paper>
              <Paper elevation={1} className={classes.adPrice}>

                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <SectionHeader>Map In</SectionHeader>
                  <div style={{fontSize:'16px', marginBottom:'5px'}}><LocationOnIcon /> {'  ' }{sellerCommunity.address.area}, {sellerCommunity.address.city} </div>
                 <Map  width='40ch' height='30ch' center={sellerCommunity.geo} zoom={10} /> 
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <br /> <br />
        </Grid>
        <br />
        <br />
        {user._id === advert.creator ?
          <Grid container direction="row" justifyContent="space-evenly" alignItems="center">

            <PrimaryButton onClick={updateAd}>Update</PrimaryButton>

            <PrimaryButton onClick={open}>Remove</PrimaryButton>
            {isOpen &&
              <DeleteAdvertModal handleDelete={deleteAd} handleClose={close} open={open} />

            }
          </Grid>
          : null}
      </Grid>
     
    </div>
  )
}