import {useEffect,useState}  from 'react'
import  React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { useProfile } from '../../context/profile.context'
import MyAdCard from '../components/MyAdCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MyAdFilter } from './MyAdFilter';
import buyAndSellAPI from '../../misc/axios-calls/buyAndSellAPI';
import Grid from '@mui/material/Grid';

export const MyAds = () => {
    const {user}=useProfile();
    const [filter, setFilter] = React.useState('active');
    const [searchFilter, setSearchFilter] = React.useState('');

    const [adverts, setAdverts] = useState([]);
    while(user==null)
        <CircularProgress/>
    const creator=user._id;
 
    const getAds=async(searchQuery)=>{
        const apiBaseUrl = `/adverts/search`  
       
        //console.log(searchQuery);
        await buyAndSellAPI.post(apiBaseUrl,searchQuery )
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
        useEffect(() => {

            let searchQuery;
            if(searchFilter==='')
            {
            searchQuery={creator,
            
                status:filter};
            }
            else
            
            {
                searchQuery={creator,
                    title :searchFilter,
                    status:filter};
                }
            
            console.log(searchQuery);

            getAds(searchQuery);
          
       }, [creator,filter,searchFilter])
    
       const setAdFilter=(data)=>{
        setFilter(data);
       }
       const setAdsearchFilter=(data)=>{
        setSearchFilter(data);
       }
    return (

        <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="flex-start"
      >
            <PageHeader>My Ads</PageHeader> 
            <MyAdFilter filter={filter} setAdsearchFilter={ setAdsearchFilter} setAdFilter={setAdFilter}  />  
             
            {adverts.map((ad)=>{
                return <MyAdCard advert={ad}/>
            })}
        </Grid>
  
    )
}
