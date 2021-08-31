import React,{useState} from 'react'
import { PhoneItem } from './PhoneItem'
import AddCircleIcon from '@material-ui/icons/AddCircle';
export const PhoneList = () => {
    const [phonelist,setPhoneList]=useState([<PhoneItem />])
    const addPhone=()=>{
        setPhoneList(prevArray => [...prevArray, <PhoneItem/> ])

    }

    return (
        <div>
            {phonelist} 
            <AddCircleIcon fontSize="large" onClick={addPhone}/>
        </div>
    )
}
