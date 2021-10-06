import React, { useState } from 'react'
import {Progress} from '../../shared/components/Progress';
import buyAndSellAPI from '../../misc/axios-calls/buyAndSellAPI';
import { useCommunity } from '../../context/community.context';
import {AdSearchResultPage} from './AdSearchResultPage';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';


export const AdSearchResult = ({ ...props }) => {
 
  const {community} = useCommunity();
    const communityid=community._id;
  const [adverts, setAdverts] = useState(null);
  const [pages, setPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);

  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    const newPageNo=parseInt(value);
    if(newPageNo===1 )
    {
      setPage(1)
      setStartIndex(0)
      setEndIndex(8)
    }
    else
    {setPage(newPageNo);
    const newStartIndex=(startIndex===0)?8:startIndex * (newPageNo-1);
    const newEndIndex=8*newPageNo
    console.log(newStartIndex);
    console.log(newEndIndex);
    setStartIndex(newStartIndex)
    setEndIndex(newEndIndex)
    }
  };
  const calculatePages=(noOfItems)=>
  {
    const modulo=noOfItems % 8;
    const div=Math.floor(noOfItems/8);
    console.log(div);
    console.log(modulo);
    let totpage=1
    if(modulo===0)
    
      totpage=parseInt(div, 10)
    else
      totpage=parseInt(div, 10) + parseInt(1);
      return totpage;
  }
  const getAds = async () => {
    const apiBaseUrl = `/adverts/search`
    const searchQuery = { communityid: communityid ,status:'active'}
   
  
    if (props.category !== '')
      searchQuery['category'] = props.category;
    if (props.subcategory !== '')
      searchQuery['subcategory'] = props.subcategory;

   // console.log(searchQuery);
    await buyAndSellAPI.post(apiBaseUrl, searchQuery)
      .then(function (response) {
        if (response.status === 200) {
        //  console.log(response.data.ads);
        const ads=response.data.ads;
        if(ads.length>8 )
        {
          const totpages =calculatePages(ads.length);
          console.log(totpages);
          setPages(totpages )
          setPage(1);
          setStartIndex(0)
          setEndIndex(8)

        }
        else
        setPages(1)
          setAdverts(ads);


        }
      })
      .catch(function (error) {
        console.log(error);

      });
  }
  React.useEffect(() => {
    getAds();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.subcategory])
  return (

    <>
      {adverts===null && <Progress/> }
     {adverts!==null &&
      <div>
        <Grid
  container
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
>
        <div style={{color:'red'}}>({adverts.length}) result(s) found </div>
        </Grid>
        <AdSearchResultPage adverts={adverts.slice(startIndex,endIndex)}/>
        {adverts.length!==0 && <Grid
  container
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
>
        <Pagination count={pages} page={page} onChange={handlePageChange} />
        </Grid>
}
      </div>
    }

    </>
  )
}