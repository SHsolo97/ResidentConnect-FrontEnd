import React,{ useEffect,createContext,useContext,useState } from "react";
import { auth } from "../misc/firebase";
import axios from "axios";
import { KeyboardReturnOutlined } from "@material-ui/icons";

const ProfileContext=createContext();
export const ProfileProvider=({children})=>{
    const[user,setUser]=useState(null);
   // const[community,setCommunity]=useState(null);
    //const[communityList,setCommunityList]=useState(null);
    //const[apartment,setApartment]=useState(null);
   // const[apartmentList,setApartmentList]=useState(null);
    const [isLoading,setIsLoading]=useState(true);

   /*const getCommunityDetails=async (communityId)=>{
    var apiBaseUrl = `http://localhost:4000/api/community/${communityId}`;
    let communityinfo=null;

  
    let data=null
 
  
    await axios.get(apiBaseUrl )
         .then(function (response) {
             if (response.status === 200)
            {           
              
             communityinfo=response.data;
                if(communityinfo!=null)
                {
             

                 data={
                    id:communityinfo._id,
                    name:communityinfo.name,
                    builder:communityinfo.builder,
                  
                }
                }     
                return data;  
                
             
             
             }
       
         })
         .catch(function (error) {
             console.log(error);
             return(null);

         });
        }
    const setCommunitydetail= (communityIds)=>{
       console.log(communityIds);
       if(communityIds==null)
        return;
         communityIds.map( async(communityId)=>{
        console.log(communityId);
        const communitydata=await getCommunityDetails(communityId);
        setCommunityList(communityList => [...communityList, communitydata]);

        });
        console.log(communityList);
        if(communityList!=null)
               setCommunity(communityList[0]);
    }
    const setApartmentdetail=async (apartmentIds)=>{
        console.log(apartmentIds);
        setApartmentList(apartmentIds);
     }
     */
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
                    console.log(userinfo.communities);
                    console.log(userinfo.apartments);
                   // setCommunitydetail(userinfo.communities);
                  //  setApartmentdetail(userinfo.apartments);

                     /*data={
                        id:userinfo._id,
                        uid:userinfo.uid,
                        email:userinfo.email,
                        type:userinfo.type,
                        profilecompletion:userinfo.profilecompletion,
                        communities:userinfo.communities,
                        apartments:userinfo.apartments

                    }*/
                    data=userinfo;
                    }  
                    setUser(data);
                 
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
    <ProfileContext.Provider value={{isLoading,user}}> {children} </ProfileContext.Provider>);

}

export const useProfile= ()=>useContext(ProfileContext);