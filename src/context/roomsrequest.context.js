import React, { createContext, useEffect, useState, useContext } from "react";
import { database } from '../misc/firebase';
import { transformArrWithId } from '../misc/helpers';
import { useCommunity } from "./community.context";



const RoomsRequestsContext = createContext();

export const RoomsRequestsProvider = ({ children }) => {
    const [roomsRequests, setRoomsRequests] = useState(null);
    //const communityid=user.communities[0];
    const {community}=useCommunity();
    const communityid=community._id;
    
    useEffect(() => {
        const reqListRef = database.ref(`requests/${communityid}`); //request list of the rooms
        reqListRef.on('value', (snap) => {
            const data = transformArrWithId(snap.val());
          
            setRoomsRequests(data)
        });
       
        return () => {
            reqListRef.off();
        }
       }, [communityid])

    return <RoomsRequestsContext.Provider value={roomsRequests}>{children}</RoomsRequestsContext.Provider>
}
export const useRoomsRequests = () => useContext(RoomsRequestsContext);