import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import Divider from '@material-ui/core/Divider';
import { SectionHeader } from '../../shared/components/SectionHeader';
import {TextField,Button} from '@material-ui/core';
import { useProfile } from '../../context/profile.context';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import AdImageUpload from '../../buyandsell/components/AdImageUpload';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useHistory } from 'react-router-dom';
import { uploadImagesToFireStorage } from '../../misc/firestore';
import { CustomTextField } from '../../shared/components/CustomTextField';
import buyAndSellAPI from '../../misc/axios-calls/buyAndSellAPI';
import { useCommunity } from '../../context/community.context';


const useStyles = makeStyles((theme) => ({
   imageList: {
        marginLeft: theme.spacing(1), 
    width: 800,
    height: 600,
  },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
      color:'secondary'
    },
  }));
export const PostAd = () => {
    const classes = useStyles();
    const history=useHistory();
    const {user}=useProfile();
    const {community}=useCommunity();
    const communityid = community._id;
    const files =[null,null,null,null,null,null,null,null,null,null,null,null];
    const [ categories,setCategories]=useState([]);
    const [ subCategories,setSubCategories]=useState([]);
    const [advert,setAdvert]=useState({
        
            communityid :communityid,
            creator:user._id,
            title: '',
            description:'',
            category: 'Autos',
            subcategory:'',
            type:'private',
            images:[],
            price:{
                value:'',
                negotiable:true
            }
        
    })
    useEffect(() => {
        
        getCategories();
    }, [])
    useEffect(() => {
        
        getSubCategories();
    }, [advert.category])

    useEffect(() => {
        
        
    }, [files])

    const getSubCategories=async()=>{

        var apiBaseUrl = `/adverts/subcategories`   
        const data={category:advert.category};     
        await buyAndSellAPI.post(apiBaseUrl,data )
             .then(function (response) {
                 if (response.status === 200)
                {  
                     setSubCategories(response.data.subcategories);
                }
             })
             .catch(function (error) {
                 console.log(error);
                 return(null);    
             });
    }
    const getCategories=async()=>{        
        var apiBaseUrl = `/adverts/categories`        
        await buyAndSellAPI.get(apiBaseUrl )
             .then(function (response) {
                 if (response.status === 200)
                { 
                     setCategories(response.data.categories);
                }           
             })
             .catch(function (error) {
                 console.log(error);
                 return(null);    
             });
    }
    const addAdvert=async(advertData)=>{
        var apiBaseUrl = `/adverts/create`   
             
        await buyAndSellAPI.post(apiBaseUrl,advertData )
             .then(function (response) {
                 if (response.status === 200)
                {           
                  
                    console.log(response.data);
                    return response.data;
                 
                }
           
             })
             .catch(function (error) {
                 console.log(error);
                 return(null);
    
             });
      }
    const setCategory=(event)=>{
 
        setAdvert((prevState)=>{
            return{...prevState,category:event.target.value}});
        
      } 
      const setSubCategory=(event)=>{
        setAdvert((prevState)=>{
            return{...prevState,subcategory:event.target.value}});
      } 
      const setAdvertTitle=(event)=>{
        setAdvert((prevState)=>{
            return{...prevState,title:event.target.value}});
      }
      const setAdvertDescription=(event)=>{
        setAdvert((prevState)=>{
            return{...prevState,description:event.target.value}});
      }
      const setPrice=(event)=>{
        let tempPrice=advert.price
        tempPrice.value = event.target.value;
        setAdvert((prevState)=>{
            return{...prevState,price:tempPrice}});   
      }
      const addFile=(file,placeholder)=>{
        console.log('inside addFile')
        console.log(file);
        files[placeholder]=file;

         
            console.log(files);
        
      }
      const handleCancel=(event)=>
      {
        history.push('/buyandsell');
      }
   
      const createAdvert=async (event)=>{
          const filePath=`adverts/${communityid}/${user._id}`;
          const validFiles=files.filter(file => file!=null);

          const fileData=await uploadImagesToFireStorage(filePath,validFiles)
          const fileDataUrls=[];
          fileData.map(data=>fileDataUrls.push(data.url));
          const advertData=advert;
          advertData.images=fileDataUrls;
       
           addAdvert(advertData);
         history.push('/myads');
          

      }
    return (
        <>
           <PageHeader>Post your Ad</PageHeader> 
           <form>
        
           <SectionHeader>Select Category</SectionHeader>
           <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" className={classes.formControl}>
        <InputLabel id="label-category">Category</InputLabel>
        <Select id="category"  value={advert.category}  onChange={setCategory} label="Category">
        {categories.map((category)=>            
          <MenuItem key={category.id} name={category.category} value={category.id}>{category.category}</MenuItem>
        )}
          </Select>
      </FormControl>
      <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" className={classes.formControl}>
        <InputLabel id="label-subcategory">Sub Category</InputLabel>
        <Select id="subcategory" value={advert.subcategory} onChange={setSubCategory} label="Sub Category">
        {subCategories.map((subcategory)=>            
          <MenuItem key={subcategory.id} name={subcategory.subcategory} value={subcategory.id}>{subcategory.subcategory}</MenuItem>
        )}
        </Select>
      </FormControl>
     
           <Divider />
           <SectionHeader>Include Details</SectionHeader>
           <CustomTextField id="adverttitle" style={{ margin: 8, width: '120ch'}}    margin="normal" label="Title" value={advert.title} onChange={setAdvertTitle} variant="outlined"/>
             <TextField id="advertdescription"  multiline rows={10} style={{ margin: 8 , width: '120ch'}}   margin="normal"  label="Classified Description" value={advert.description} onChange={setAdvertDescription} variant="outlined"/>
             <TextField id="advertprice" style={{ margin: 8,  width: '120ch' }}   margin="normal" label="Price" value={advert.price.value} onChange={setPrice} variant="outlined"/>
      
           <Divider />
           <SectionHeader>Upload Photos</SectionHeader>
                      
           <div> ({advert.images.length}) images uploaded successfully </div> 

           <ImageList    rowHeight={180}  cols={4} className={classes.imageList}>

        {[...Array(12)].map((item, i) => (
         
         <ImageListItem >
            <AdImageUpload placeholder={i}   file={files[i]} addFile={addFile}/>
            </ImageListItem>
   
        ))}
        </ImageList>
           <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
            <PrimaryButton onClick={createAdvert} > Submit</PrimaryButton>
            <PrimaryButton onClick={handleCancel}> Cancel</PrimaryButton>
            </Grid>
            
        

           </form>
        </>
    )
}
