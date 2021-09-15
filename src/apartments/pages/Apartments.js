import React from 'react'
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context';
import { PageHeader } from '../../shared/components/PageHeader'
import PrimaryButton from '../../shared/components/PrimaryButton'
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FlatRow } from '../components/FlatRow';
import Grid from '@material-ui/core/Grid';
import communityAPI from '../../misc/axios-calls/communityAPI';
import notificationAPI from '../../misc/axios-calls/notificationAPI';

export const Apartments = ({children,...props}) => {
    const {user}=useProfile();
    const communityid=user.communities[0];
    //const communityid='6132ab3d442964fd1c7ef7f4';
    const [community,setCommunity]=React.useState(null)
    const [blocks,setBlocks]=React.useState([]);
    const [currentBlock,setCurrentBlock]=React.useState('');
    const [floors,setFloors]=React.useState([]);
    const [currentFloor,setCurrentFloor]=React.useState(0);
    const [flats,setFlats]=React.useState([]);
    const [models,setModels]=React.useState([]);
    const [isLoading, setLoading] = React.useState(true);

    const getApartmentModels=async()=>{
        var apiBaseUrl = `/community/${communityid}/apartments/models`   
        await communityAPI.get(apiBaseUrl )
             .then(function (response) {
                 if (response.status === 200)

                {
                   // console.log(response.data.models);
                     setModels(response.data.models);
                   
                  
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    }
    const getCommunityDetails=async ()=>{
        var apiBaseUrl = `/community/${communityid}`   
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
                        data.push(b);
                        
                    })
                    setCurrentBlock(data[0])
                   
                    //console.log(data);
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
        searchquery['communityid']=communityid;
        searchquery['block']=currentBlock.block   ;
        searchquery['floor']=currentFloor ;  
        //console.log(searchquery);
        await communityAPI.post(apiBaseUrl,searchquery )
             .then(function (response) {
                 if (response.status === 200)
                 {
                   // console.log(response.data);
                    setCommunity(response.data);
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
               data['communityid']=communityid;
               data['aptnum']=flat.aptnum
               data['block']=flat.block;
               data['floor']=flat.floor;
                data['model']=flat.model;
               // console.log(data);
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
        getCommunityDetails();
        getApartmentModels();
    }, [communityid])

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
    const deleteRow=()=>{

    }
     return (
        <>

        <PageHeader>{children}</PageHeader>
        <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" >
        <Select id="blocks" value={currentBlock.block} onChange={setCurrentBlockInfo}  >
        {blocks.map((block)=>            
          <MenuItem key={block.id} name={block.id} value={block.block}>{block.block}</MenuItem>
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
        </>
    )
}
