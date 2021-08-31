import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
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
import { PhoneList } from '../components/PhoneList';
import ImageUpload from '../components/ImageUpload';

const useStyles = makeStyles((theme) => ({
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
export const AddClassified = () => {
    const classes = useStyles();
    const {user}=useProfile();
    const  communityid ="612bf9c96b1331634c3a701c";
    const [ categories,setCategories]=useState([]);
    const [ subCategories,setSubCategories]=useState([]);

    const [classified,setClassified]=useState({
        
        category:'',
        subcategory:'',
        name:'',
        description:'',
        website:'',
        phone:[],
        emails:[],
        address : {
                    addressline : '',
                    area : '',
                    city: '',
                    state : '',
                    pincode : ''
                }
    
    });
    useEffect(() => {
        
        getCategories();
    }, [])
    useEffect(() => {
        
        getSubCategories();
    }, [classified.category])

    const getSubCategories=async()=>{

        var apiBaseUrl = `http://localhost:4005/api/classifieds/subcategories`   
        const data={category:classified.category};     
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
        
        var apiBaseUrl = `http://localhost:4005/api/classifieds/categories`        
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
    const addClassified=()=>{
        console.log(classified);    
    }
    const setClassifiedName=(event)=>{
        setClassified((prevState)=>{
            return{...prevState,name:event.target.value}});
      }
      const setClassifiedDescription=(event)=>{
        setClassified((prevState)=>{
            return{...prevState,description:event.target.value}});
      }
      const setCategory=(event)=>{
        setClassified((prevState)=>{
            return{...prevState,category:event.target.value}});
      } 
      const setSubCategory=(event)=>{
        setClassified((prevState)=>{
            return{...prevState,subcategory:event.target.value}});
      } 
        
      const setAddressLine=(event)=>{
        let tempaddress=classified.address
        tempaddress.addressline = event.target.value;
        setClassified((prevState)=>{
            return{...prevState,address:tempaddress}});   
      }
    const setArea=(event)=>{
        let tempaddress=classified.address
        tempaddress.area = event.target.value;
        setClassified((prevState)=>{
            return{...prevState,address:tempaddress}}); 
    }
    
    const setCity=(event)=>{
        let tempaddress=classified.address
        tempaddress.city = event.target.value;
        setClassified((prevState)=>{
            return{...prevState,address:tempaddress}}); 
    }
    
    const setState=(event)=>{
        let tempaddress=classified.address
        tempaddress.state = event.target.value;
        setClassified((prevState)=>{
            return{...prevState,address:tempaddress}}); 
    }
    const setPincode=(event)=>{
        let tempaddress=classified.address
        tempaddress.pincode = event.target.value;
        setClassified((prevState)=>{
            return{...prevState,address:tempaddress}}); 
    }
    const setWebSite=(event)=>{
        setClassified((prevState)=>{
            return{...prevState,website:event.target.value}});
      }
    
    
        return (
            <>
            <PageHeader>Add Classified</PageHeader>
          <form  >
          <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" className={classes.formControl}>
        <InputLabel id="label-category">Category</InputLabel>
        <Select id="category"  value={classified.category}  onChange={setCategory} label="Category">
        {categories.map((category)=>            
          <MenuItem key={category.id} name={category.category} value={category.id}>{category.category}</MenuItem>
        )}
          </Select>
      </FormControl>
      <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" className={classes.formControl}>
        <InputLabel id="label-subcategory">Sub Category</InputLabel>
        <Select id="subcategory" value={classified.subcategory} onChange={setSubCategory} label="Sub Category">
        {subCategories.map((subcategory)=>            
          <MenuItem key={subcategory.id} name={subcategory.subcategory} value={subcategory.id}>{subcategory.subcategory}</MenuItem>
        )}
        </Select>
      </FormControl>
       <TextField id="classifiedname" style={{ margin: 8, width: '100ch'}}    margin="normal" label="Classified Name" value={classified.name} onChange={setClassifiedName} variant="outlined"/>
       <TextField id="classfieddescription"  multiline rows={10} style={{ margin: 8 , width: '100ch'}}   margin="normal"  label="Classified Description" value={classified.description} onChange={setClassifiedDescription} variant="outlined"/>
       <TextField id="addressline" style={{ margin: 8,  width: '100ch' }}   margin="normal" label="Address" value={classified.address.addressline} onChange={setAddressLine} variant="outlined"/>
       <TextField id="area"  style={{ margin: 8 ,  width: '100ch' }}   margin="normal" label="Area" value={classified.address.area} onChange={setArea} variant="outlined"/>
       <div className={classes.root}>
       <TextField id="city" className={classes.textField} label="City" value={classified.address.city} onChange={setCity} variant="outlined"/>
       <TextField id="state" className={classes.textField} label="State" value={classified.address.state} onChange={setState} variant="outlined"/>
       <TextField id="pincode" className={classes.textField} label="Pincode" value={classified.address.pincode} onChange={setPincode} variant="outlined"/>
       </div>
       <TextField id="website" style={{ margin: 8, width: '100ch'}}    margin="normal" label="Website" value={classified.website}
       InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LanguageTwoToneIcon />
          </InputAdornment>
        ),
      }} onChange={setWebSite} variant="outlined"/>
       
       <PhoneList/>

       <ImageUpload  id="classifieldIamge" errorText="Upload Image" />
       <Button variant="contained" style ={{backgroundColor: orange[500] }} onClick={addClassified}>Add</Button>
      
          </form>
          </>
          )
    
}
