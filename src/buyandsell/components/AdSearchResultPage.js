import React from 'react'
import SellItemCard from './SellItemCard';
import { Box, Grid } from '@material-ui/core';

export const AdSearchResultPage = ({...props}) => {
      return (

            <>
        
              <Grid container spacing={3}>
        
        
                {
        
                  props.adverts.map((advert) => {
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
