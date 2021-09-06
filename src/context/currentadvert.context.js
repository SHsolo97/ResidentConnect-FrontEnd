import React from 'react';
import { createContext, useContextSelector } from "use-context-selector";



const CurrentAdvertContext = createContext();

export const CurrentAdvertrovider = ({ children, data }) => {

    return <CurrentAdvertContext.Provider value={data}> {children}</CurrentAdvertContext.Provider>
}

export const useCurrentAdvert = (selector) => useContextSelector(CurrentAdvertContext, selector);

