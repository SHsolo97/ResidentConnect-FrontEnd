import React,{useState} from 'react'
import {TextField,Button} from '@material-ui/core';

import { PageHeader } from '../../shared/components/PageHeader'
import { useHistory } from 'react-router'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { orange } from '@material-ui/core/colors'
import { AdSearch } from '../components/AdSearch';
import { AdSearchResult } from '../components/AdSearchResult';


const BuyAndSell = () => {
    const history=useHistory();
    const[category,setCategory]=useState('');
    const[subcategory,setSubCategory]=useState('');

    const goToPostAd=()=>{
        history.push('/postAd');

    }

    return (
        <>
           <PageHeader> Buy &amp; Sell</PageHeader>
           <Button variant="contained" style ={{backgroundColor: orange[500] }} onClick={goToPostAd}>Sell</Button>
           <AdSearch category={category} setCategory={setCategory} subcategory={subcategory} setSubCategory={setSubCategory} />
           <AdSearchResult category={category} subcategory={subcategory} />
        
        </>
    )
}

export default BuyAndSell
