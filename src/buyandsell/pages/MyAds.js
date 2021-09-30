import {useEffect,useState}  from 'react'
import  React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { useProfile } from '../../context/profile.context'
import MyAdCard from '../components/MyAdCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MyAdFilter } from './MyAdFilter';
import buyAndSellAPI from '../../misc/axios-calls/buyAndSellAPI';

export const MyAds = () => {
    const {user}=useProfile();
  
    const [adverts, setAdverts] = useState([]);
    while(user==null)
        <CircularProgress/>
    const creator=user._id;
 
    const getAds=async(creator)=>{
        const apiBaseUrl = `/adverts/search`  
        const searchQuery={creator}
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
            getAds(creator);
          
       }, [creator])
    
    return (

            <div>
            <PageHeader>My Ads</PageHeader> 
            <MyAdFilter/>  
             
            {adverts.map((ad)=>{
                return <MyAdCard advert={ad}/>
            })}
        </div>
  
    )
}
