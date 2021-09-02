import React,{ useEffect,createContext,useContext,useState } from "react";
import axios from "axios";
import { useCommunity } from "./community.context";
import { useProfile } from "./profile.context";

const ApartmentModelsContext=createContext();
export const ApartmentModelsProvider=({children,data})=>{
   

    return (
    <ApartmentModelsContext.Provider value={{data}}> {children} </ApartmentModelsContext.Provider>);

}

export const useApartmentModel= (selector)=>useContext(ApartmentModelsContext,selector);