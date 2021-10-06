
import React from 'react'
import { useCommunity } from '../../context/community.context';
import { PageHeader } from '../../shared/components/PageHeader'
import {PrimaryButton}from '../../shared/components/PrimaryButton'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FlatRow } from '../components/FlatRow';
import communityAPI from '../../misc/axios-calls/communityAPI';
import notificationAPI from '../../misc/axios-calls/notificationAPI';
import { Progress } from '../../shared/components/Progress';

export const Apartments = ({children,...props}) => {
   
    const {community,setCommunity}=useCommunity();
    console.log(community);
   
    const [blocks,setBlocks]=React.useState([]);
    const [currentBlock,setCurrentBlock]=React.useState('');
  
    const [currentFloor,setCurrentFloor]=React.useState(0);
    const [flats,setFlats]=React.useState([]);
    const [models,setModels]=React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const getApartmentModels=async()=>{
        var apiBaseUrl = `/community/${community._id}/apartments/models`   
        await communityAPI.get(apiBaseUrl )
             .then(function (response) {
                 if (response.status === 200)

                {
                   // console.log(response.data.models);
                     setModels(response.data.models);
                     setIsLoading(false);
                  
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    }
    const getCommunityDetails=async ()=>{
        var apiBaseUrl = `/community/${community._id}`   
        await communityAPI.get(apiBaseUrl )
             .then(function (response) {
                 if (response.status === 200)
                 {
                    //console.log(response.data);
                    setCommunity(response.data);
                    let blockdetails=response.data.blockdetails;
                    let data=[];
                    blockdetails.map((block)=>
                    {
                        let b={};
                        b['floors']=block.floors;
                        b['flats']=block.flats;
                        b['block']=block.block;
                        b['_id']=block._id;
                        data.push(b)
                        
                    });
                    if(data.length>0)
                        setCurrentBlock(data[0])
                   
                        console.log(data);
                    setBlocks(data);
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    }

    const createApartment=async (data)=>{
        var apiBaseUrl = `/community/apartment/create`   
  
        return await communityAPI.post(apiBaseUrl,data )
             .then(function (response) {
                 if (response.status === 201)
                 {
                    //console.log(response.data.apartment);
                    return response.data.apartment;
                }
             })
             .catch(function (error) {
                 console.log(error);
                 return null;
                  
             })
            
    }

    const getApartments=async ()=>{
        var apiBaseUrl = `/community/apartments`   
        let searchquery={};
        searchquery['communityid']=community._id;
        searchquery['block']=currentBlock.block   ;
        searchquery['floor']=currentFloor ;  
        //console.log(searchquery);
        await communityAPI.post(apiBaseUrl,searchquery )
             .then(function (response) {
                 if (response.status === 200)
                 {
                   // console.log(response.data);
                    //setCommunity(response.data);
                    let apartments=response.data.apartments;
                    //console.log(apartments);
                    let data=[];
                    [...Array(currentBlock.flats)].map((item, i) =>
                    {
                        
                        let b={};
                        b['key']=i;
                        b['aptnum']='';
                        b['model']={};
                        b['model']['name']='';
                        b['block']=currentBlock.block;
                        b['floor']=currentFloor;
                        b['status']='';
                        b['email']='';
                        data.push(b);

                    })
                    apartments.map((apt,i)=>
                    {
                        data[i]['aptnum']=apt.aptnum;                      
                        data[i]['status']=apt.status;                    
                        data[i]['model']=apt.model;                    

                    })
                   
                    //console.log(data);
                    setFlats(data);
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    }
    const handleSubmit=(e)=>{
        props.handleNext();
        //console.log(flats);
    }

    const sendMail=(email,token,aptnum)=>{

        //console.log(token);
        const recipient=email;
        const subject='Enroll to Residents Connect'
        const body=`Enroll to resident app (http://127.0.0.1:3000/sigin) using token id ${token} for ${aptnum}`;
        let data={
            "subject":subject,
             "body":body,
             "recipient":recipient
        }
        notificationAPI.post('/sendMail', data)
        
    
        .then(res => {

        }
            )
            .catch(err=>{
                console.log(err);
               
            })

    }
    const enrollFlats= (e)=>{
       // console.log(flats);
        flats.map((flat=>{
            let data={};
            data['issold']= flat.status==='not-sold'?false:true;
            data['enrolled']= 0;
            data['status']= flat.status;
               data['communityid']=community._id;
               data['aptnum']=flat.aptnum
               data['block']=flat.block;
               data['floor']=flat.floor;
                data['model']=flat.model;
                console.log(data);
            createApartment(data)
            .then(response=>
            {
               // console.log(response);
                const tokenid=response.token;
               // console.log(tokenid);
                if(flat.email!==null && flat.email!=='')
                    sendMail(flat.email,tokenid,flat.aptnum);

            })
        }))

    }
    const handleBack=(e)=>{
        props.handleBack();
    }
    React.useEffect(() => {
        if(community===null)
            return;
      

        getCommunityDetails().then(
            response=>{
                getApartmentModels();

            }
        );
    }, [])

    const setCurrentBlockInfo=(e)=>{

        const selectedValue=e.target.value;
        blocks.map((block)=>{
            if(block.block=== selectedValue)
            {
                setCurrentBlock(block);
                setCurrentFloor(0);
            }
        });
    }
    const setCurrentFloorInfo=(e)=>{
        setCurrentFloor(e.target.value);
    }
    const GetFlats=(e)=>
    {
       // console.log(currentBlock);
       // console.log(currentFloor);
        getApartments();
    }
    const saveRow=(flatsToAdd)=>{
        setFlats((flats) => flats.map((flat) =>{
            if(flat.key === flatsToAdd.key)
                return flatsToAdd;
            else
            return flat;
        }));
    }
   
    const renderApartmentInfo=()=>{
        console.log(currentBlock);
        console.log(blocks);
        if(currentBlock==null)
            if(blocks!=null)
                setCurrentBlock(blocks[0]);
            else
                return null;
        return(<div>
            <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" >
        <Select id="blocks" value={currentBlock.block} onChange={setCurrentBlockInfo}  >
        {blocks.map((block)=>            
          <MenuItem key={block._id} name={block._id} value={block.block}>{block.block}</MenuItem>
        )}
          </Select>
      </FormControl>
      <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" >

      <Select id="floors" value={currentFloor} onChange={setCurrentFloorInfo}  >
      {[...Array(currentBlock.floors)].map((item, i) => <MenuItem value={i}> {i} </MenuItem>)}
          </Select>
      </FormControl>
      <PrimaryButton  onClick={GetFlats}> Get </PrimaryButton>

      {flats.map((flat,index)=>{
            return <FlatRow models={models} key={index} isNew="true" saveRow={saveRow}  flat={flat} />

        })}
        <PrimaryButton  onClick={enrollFlats}> Enroll </PrimaryButton>
        <PrimaryButton  onClick={handleBack}> Back </PrimaryButton>
        <PrimaryButton  onClick={handleSubmit}> Next </PrimaryButton>
        </div>)
    }
     return (
        <>

        <PageHeader>{children}</PageHeader>
        {
            (blocks.length===0 && isLoading)?
            <Progress/>
            :
            renderApartmentInfo()

        }
        
        </>
    )
}