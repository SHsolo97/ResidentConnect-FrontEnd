import React from 'react';
import { createContext, useContextSelector } from "use-context-selector";



const CurrentClassifiedContext = createContext();

export const CurrentClassifiedProvider = ({ children, data }) => {

    return <CurrentClassifiedContext.Provider value={data}> {children}</CurrentClassifiedContext.Provider>
}

export const useCurrentClassified = (selector) => useContextSelector(CurrentClassifiedContext, selector);

