import React,{ useEffect,createContext,useContext,useState } from "react";

import { auth, database } from '../misc/firebase';
import firebase from 'firebase/app';
import userAPI from '../misc/axios-calls/userAPI';

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const ProfileContext=createContext();
export const ProfileProvider=({children})=>{
    const[user,setUser]=useState(null);
    
    let userStatusRef;

    const [isLoading,setIsLoading]=useState(true);

   
    const setUserDetails=async (uid)=>
    {
        var apiBaseUrl = `/users/search`;
        let userinfo=null;
        let searchquery=null;
       
        searchquery={uid:uid}
      
        let data=null
     
        //console.log(searchquery);
        await userAPI.post(apiBaseUrl,searchquery )
             .then(function (response) {
                 if (response.status === 200)
                {           
                  
                    userinfo=response.data.users[0];
                    if(userinfo!=null)
                    {
                   // console.log(userinfo);
                   // console.log(userinfo.communities);
                   // console.log(userinfo.apartments);
                
                    data=userinfo;
                    setUser(data);
                    }  
                    
                 
                 }
           
             })
             .catch(function (error) {
                 console.log(error);
                 setUser(null);

             });
             
    }
    useEffect(()=>{

        const authUnsub=auth.onAuthStateChanged(authObj=>{
            if(authObj)
            {
                setUserDetails(authObj.uid)              
                setIsLoading(false); 
               // setCommunitydetail();
               // setApartmentdetail();
               // eslint-disable-next-line react-hooks/exhaustive-deps
               userStatusRef = database.ref(`/status/${authObj.uid}`);

               database.ref('.info/connected').on('value', function (snapshot) {                  
                   if (!!snapshot.val() === false) {
                       return;
                   }

                   
                   userStatusRef.onDisconnect().set(isOfflineForDatabase).then(function () {                
                       userStatusRef.set(isOnlineForDatabase);
                   });
               });
            }
            else
            {
                setUser(null);               
                setIsLoading(false);

            }

        });
        return ()=>{
            authUnsub();
         
        }
    },[])

    return (
    <ProfileContext.Provider value={{isLoading,setIsLoading,user,setUser}}> {children} </ProfileContext.Provider>);

}

export const useProfile= ()=>useContext(ProfileContext);