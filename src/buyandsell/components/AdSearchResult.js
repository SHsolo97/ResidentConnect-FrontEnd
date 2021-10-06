import React, { useState } from 'react'


import SellItemCard from './SellItemCard';
import { Box, Grid } from '@material-ui/core';
import buyAndSellAPI from '../../misc/axios-calls/buyAndSellAPI';
import { useCommunity } from '../../context/community.context';


export const AdSearchResult = ({ ...props }) => {
 
  const {community} = useCommunity();
    const communityid=community._id;
  const [adverts, setAdverts] = useState([]);
  const getAds = async () => {
    const apiBaseUrl = `/adverts/search`
    const searchQuery = { communityid: communityid ,status:'active'}

    if (props.category !== '')
      searchQuery['category'] = props.category;
    if (props.subcategory !== '')
      searchQuery['subcategory'] = props.subcategory;

    console.log(searchQuery);
    await buyAndSellAPI.post(apiBaseUrl, searchQuery)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data.ads);
          setAdverts(response.data.ads);


        }
      })
      .catch(function (error) {
        console.log(error);

      });
  }
  React.useEffect(() => {
    getAds();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.subcategory])
  return (

    <>

      <Grid container spacing={3}>


        {

          adverts.map((advert) => {
            return <Grid item xs={3}>
              <Box flexDirection="row" p={2}>
                <SellItemCard key={advert._id} item={advert} />
              </Box>
            </Grid>

          })
        }
      </Grid>
    </>
  )
}