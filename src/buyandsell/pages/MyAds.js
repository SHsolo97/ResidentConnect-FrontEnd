import {useEffect,useState}  from 'react'
import  React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { useProfile } from '../../context/profile.context'
import axios from 'axios';
import MyAdCard from '../components/MyAdCard';
import { AdvertsProvider, useAdverts } from '../../context/adverts.context';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MyAdFilter } from './MyAdFilter';

export const MyAds = () => {
    const {user}=useProfile();
  
    const [adverts, setAdverts] = useState([]);
    while(user==null)
        <CircularProgress/>
    const creator=user._id;
 
    const getAds=async()=>{
        const apiBaseUrl = `http://localhost:4004/api/adverts`  
        const searchQuery={creator:creator}
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
        useEffect(() => {
            getAds();
          
       }, [ ])
    
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
