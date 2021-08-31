import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import Divider from '@material-ui/core/Divider';
import { SectionHeader } from '../../shared/components/SectionHeader';
import {TextField,Button} from '@material-ui/core';
import { useProfile } from '../../context/profile.context';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { orange } from '@material-ui/core/colors'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import AdImageUpload from '../../buyandsell/components/AdImageUpload';

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
    },
  }));
export const PostAd = () => {
    const classes = useStyles();
    const {user}=useProfile();
    const  communityid ="612bf9c96b1331634c3a701c";

    const [ categories,setCategories]=useState([]);
    const [ subCategories,setSubCategories]=useState([]);
    const [advert,setAdvert]=useState({
        
            communityid : user.communities[0],
            creator:user.id,
            title: '',
            description:'',
            category: '',
            subcategory:'',
            type:'',
            images:[],
            price:{
                value:'',
                currency:'INR',
                negotiable:true
            }
        
    })
    useEffect(() => {
        
        getCategories();
    }, [])
    useEffect(() => {
        
        getSubCategories();
    }, [advert.category])

    const getSubCategories=async()=>{

        var apiBaseUrl = `http://localhost:4004/api/adverts/subcategories`   
        const data={category:advert.category};     
        await axios.post(apiBaseUrl,data )
             .then(function (response) {
                 if (response.status === 200)
                {           
                  
                    console.log(response.data.subcategories);
                    setSubCategories(response.data.subcategories);
                }
           
             })
             .catch(function (error) {
                 console.log(error);
                 return(null);
    
             });
    }
    const getCategories=async()=>{
        
        var apiBaseUrl = `http://localhost:4004/api/adverts/categories`        
        await axios.get(apiBaseUrl )
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
           <TextField id="adverttitle" style={{ margin: 8, width: '100ch'}}    margin="normal" label="Title" value={advert.title} onChange={setAdvertTitle} variant="outlined"/>
             <TextField id="advertdescription"  multiline rows={10} style={{ margin: 8 , width: '100ch'}}   margin="normal"  label="Classified Description" value={advert.description} onChange={setAdvertDescription} variant="outlined"/>
             <TextField id="advertprice" style={{ margin: 8,  width: '100ch' }}   margin="normal" label="Price" value={advert.price.value} onChange={setPrice} variant="outlined"/>
      
           <Divider />
           <SectionHeader>Upload Photos</SectionHeader>
                      
           
           <ImageList    rowHeight={180}  cols={4} className={classes.imageList}>

        {[...Array(12)].map((item, i) => (
         
         <ImageListItem >
            <AdImageUpload/>
            </ImageListItem>
   
        ))}
        </ImageList>
           <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
            <Button variant="contained" style ={{backgroundColor: orange[500] }}> Submit</Button>
            <Button variant="contained" style ={{backgroundColor: orange[500] }}> Cancel</Button>
            </Grid>
            
        

           </form>
        </>
    )
}
