import React, { createContext, useEffect, useState, useContext } from "react";
import { database } from '../misc/firebase';
import { transformArrWithId } from '../misc/helpers';
import { useCommunity } from "./community.context";



const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
    const [rooms, setRooms] = useState(null);
    //const communityid=user.communities[0];
    const {community}=useCommunity();
    const communityid=community._id;
    useEffect(() => {
        const roomListRef = database.ref(`rooms/${communityid}`);
        roomListRef.on('value', (snap) => {
            const data = transformArrWithId(snap.val());
            
            setRooms(data)
        });

        return () => {
            roomListRef.off();
        }
    },[communityid]);


    return <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
}
export const useRooms = () => useContext(RoomsContext);