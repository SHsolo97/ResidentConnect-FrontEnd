/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useEffect, useState, useContext } from "react";

import { useProfile } from "./profile.context";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import buyAndSellAPI from '../misc/axios-calls/buyAndSellAPI';

const AdvertsContext = createContext();

export const AdvertsProvider = ({ children }) => {
    const [adverts, setAdverts] = useState([]);
    const {user}=useProfile();
    while(user==null)
        <CircularProgress/>
    const creator=user._id;
 
    const getAds=async()=>{
        const apiBaseUrl = `/adverts`  
        const searchQuery={creator:creator}
        //console.log(searchQuery);
        await buyAndSellAPI.post(apiBaseUrl,searchQuery )
             .then(function (response) {
                 if (response.status === 200)
    
                {
                   // console.log(response.data.ads);
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
    


    return <AdvertsContext.Provider value={adverts}>{children}</AdvertsContext.Provider>
}
export const useAdverts = () => useContext(AdvertsContext);