import React,{ useEffect,createContext,useContext,useState } from "react";
import { auth } from "../misc/firebase";
import axios from "axios";

const ProfileContext=createContext();
export const ProfileProvider=({children})=>{
    const[profile,setProfile]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    
    const setUserDetails=async (uid)=>
    {
        var apiBaseUrl = `http://localhost:4002/api/users/search`;
        let userinfo=null;
        let searchquery=null;
       
        searchquery={uid:uid}
      
        let data=null
        console.log(searchquery);
        await axios.post(apiBaseUrl,searchquery )
             .then(function (response) {
                 if (response.status === 200)
                {           
                  
                    userinfo=response.data.users[0];
                    if(userinfo!=null)
                    {
                    console.log(userinfo);
                     data={
                        id:userinfo._id,
                        uid:userinfo.uid,
                        email:userinfo.email,
                        type:userinfo.type,
                        profilecompletion:userinfo.profilecompletion

                    }
                    }       
                    setProfile(data);
                 
                 }
           
             })
             .catch(function (error) {
                 console.log(error);
                 setProfile(null);
                 
             });
             
    }
    useEffect(()=>{

        const authUnsub=auth.onAuthStateChanged(authObj=>{
            if(authObj)
            {
                setUserDetails(authObj.uid)              
                setIsLoading(false);
            }
            else
            {
                setProfile(null);
                setIsLoading(false);
            }

        });
        return ()=>{
            authUnsub();
        }
    },[])

    return (
    <ProfileContext.Provider value={{isLoading,profile}}> {children} </ProfileContext.Provider>);

}

export const useProfile= ()=>useContext(ProfileContext);