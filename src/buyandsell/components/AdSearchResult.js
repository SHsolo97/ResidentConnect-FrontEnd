import React, {useState} from 'react'
import { useProfile } from '../../context/profile.context';
import axios from 'axios';
import SellItemCard from './SellItemCard';
import { Box, Grid } from '@material-ui/core';
export const AdSearchResult = ({...props}) => {
const {user}=useProfile();
const communityid=user.communities[0];
const [adverts, setAdverts] = useState([]);

const getAds=async()=>{
const apiBaseUrl = `http://localhost:4004/api/adverts`
const searchQuery={communityid:communityid}

if(props.category!=='')
searchQuery['category']=props.category;
if(props.subcategory!=='')
searchQuery['subcategory']=props.subcategory;

console.log(searchQuery);
await axios.post(apiBaseUrl,searchQuery )
.then(function (response) {
if (response.status === 200)

{
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
console.log(adverts);

}, [props.category,props.subcategory])
return (

<>

  <Grid container spacing={3}>


    {

    adverts.map((advert)=>{
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