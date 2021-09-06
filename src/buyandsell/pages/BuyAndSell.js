import React,{useState} from 'react'
import {TextField,Button} from '@material-ui/core';

import { PageHeader } from '../../shared/components/PageHeader'
import { useHistory } from 'react-router'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { orange } from '@material-ui/core/colors'
import { AdSearch } from '../components/AdSearch';
import { AdSearchResult } from '../components/AdSearchResult';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { AdvertsProvider } from '../../context/adverts.context';


const BuyAndSell = () => {
    const history=useHistory();
    const[category,setCategory]=useState('');
    const[subcategory,setSubCategory]=useState('');

    const goToPostAd=()=>{
        history.push('/postAd');

    }
    const goToMyAds=()=>{
        history.push('/myads');
    }

    return (
        <>
               <PageHeader> Buy &amp; Sell</PageHeader>
                <PrimaryButton onClick={goToPostAd}>Sell</PrimaryButton>
                <PrimaryButton onClick={goToMyAds}>My Ads</PrimaryButton>

                <AdSearch category={category} setCategory={setCategory} subcategory={subcategory} setSubCategory={setSubCategory} />
                <AdSearchResult category={category} subcategory={subcategory} />
      
        </>
    )
}

export default BuyAndSell
