import React from 'react';
import { createContext, useContextSelector } from "use-context-selector";



const CurrentRoomRequestContext = createContext();

export const CurrentRoomRequestProvider = ({ children, data }) => {

    return <CurrentRoomRequestContext.Provider value={data}> {children}</CurrentRoomRequestContext.Provider>
}

export const useCurrentRoomRequest = (selector) => useContextSelector(CurrentRoomRequestContext, selector);

