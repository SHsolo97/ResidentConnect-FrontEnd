import React from 'react'
import PrimaryButton from '../../shared/components/PrimaryButton'
import axios from 'axios';
import { Grid, GridListTileBar, TextField } from '@material-ui/core';
import { BlockRow } from '../components/BlockRow';
import { makeStyles } from '@material-ui/core/styles';
import { useProfile } from '../../context/profile.context';
import { PageHeader } from '../../shared/components/PageHeader';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export const ApartmentBlocks = ({children,...props}) => {
   
    const {user}=useProfile();
    
    const communityid=user.communities[0];
   const classes=useStyles();
   const [key,setKey]=React.useState(0);
    const IINTIAL_VALUE={
       
           floors: 0,
            flats: 0,
        
            block: '',
            floordetails: []
           
    }
    const editBlocks=async (blocksToAdd)=>{
    
        var apiBaseUrl = `http://localhost:4000/api/community/${communityid}/blocks/edit`  
        await axios.put(apiBaseUrl,blocksToAdd )
             .then(function (response) {
                 if (response.status === 200)
    
                {
                    console.log(response.data);              
                    
              
                   
                  
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    }
    const [isNew,setIsNew]=React.useState([])
    const [blocks,setBlocks]=React.useState([])
    const getApartmentBlocks=async()=>{
        var apiBaseUrl = `http://localhost:4000/api/community/${communityid}/blocks`   
        await axios.get(apiBaseUrl )
             .then(function (response) {
                 if (response.status === 200)

                {
                    console.log(response.data.blocks);
                    const blockList=response.data.blocks;
                 
                    blockList.map((block,index)=>{
                        blockList[index] = {...block, key: index};
                        setKey(index+1);
                        });
                        console.log(blockList);
                    setBlocks(blockList)
                   
                  
                }
             })
             .catch(function (error) {
                 console.log(error);
                  
             });
    }
    React.useEffect(() => {
        getApartmentBlocks();
      
      
    }, [])
    const addRow=(e)=>{
        let block=IINTIAL_VALUE;
        block.key=key;
        setBlocks([...blocks, block]);
        setKey(key=>key+1);
        setIsNew([...isNew,true]);
        console.log(blocks);
    }
    const handleSubmit=(e)=>{
        console.log(blocks);
        let blockdetails=[];
        blocks.map((block)=>{
         let b={};
         b['floors'] =parseInt(block['floors'])
         b['flats'] =parseInt(block['flats'])
         b['block'] =block['block']
         b['floordetails'] =block['floordetails']
         blockdetails.push(b);
        })
        console.log(blockdetails);
        editBlocks(blockdetails);
        props.handleNext();
      }
      const handleBack=(e)=>{
        props.handleBack();
      }

      const deleteRow=(key)=> {
      
          setBlocks((blocks) => blocks.filter((block) => block.key !== key));
      }
      const saveRow=(blocktoAdd)=>{

        setBlocks((blocks) => blocks.map((block) =>{
            if(block.key === blocktoAdd.key)
                return blocktoAdd;
            else
            return block;
        }));



      }
       return (
      
            <Grid
  container
  direction="column"
  justifyContent="center"
  alignItems="center"
>  <PageHeader>{children}</PageHeader>
         <PrimaryButton onClick={addRow}>Add Block</PrimaryButton>
         <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
          <div className={classes.formControl}> Block </div>
          <div className={classes.formControl}> Floors</div>
          <div className={classes.formControl}>Flats </div>

          </Grid>
         {blocks.map((block,index)=>{
            return <BlockRow key={index} isNew="true" saveRow={saveRow} deleteRow={deleteRow} block={block} />

        })}
         <div>         
        <PrimaryButton  onClick={handleBack}> Back </PrimaryButton>
         <PrimaryButton  onClick={handleSubmit}> Next </PrimaryButton>
         </div>

         </Grid>
    )
}
