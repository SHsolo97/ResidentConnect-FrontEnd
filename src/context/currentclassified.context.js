import React, {useState,useEffect,useContext,createContext} from 'react';

import classifiedAPI from '../../misc/axios-calls/classifiedAPI';
import _ from 'lodash';




const CurrentClassifiedContext = createContext();

export const CurrentClassifiedProvider = ({ children }) => {
    const[classified,setClassified]=useState(null);
    const[classifiedId,setClassifiedId]=useState(null);

    const fetchClassified = async (searchQuery) => {

  
        console.log(searchQuery);
      const response = await classifiedAPI.post('/classifieds/search',searchQuery);
      if(response.data.classifieds.length>0)
         return response.data.classifieds[0];
      else
         return  null
    
    
    };
    useEffect(() => {
        const searchQuery={
            "_id":classifiedId
        }
        const data=fetchClassified(searchQuery);
        setClassified(data);
        return () => {
            setClassified(null);
        }
    }, [classifiedId])
    return <CurrentClassifiedContext.Provider value={setClassifiedId,classifiedId,classified}> {children}</CurrentClassifiedContext.Provider>
}

export const useCurrentClassified = () => useContext(CurrentClassifiedContext);
