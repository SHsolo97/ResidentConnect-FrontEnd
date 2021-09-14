import React,{useState} from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export const AdSearch = ({...props}) => {
    const [ categories,setCategories]=useState([]);
    const [ subCategories,setSubCategories]=useState([]);

    useEffect(() => {
        
        getCategories();
    },[])
    useEffect(() => {
        if(props.category==='')
            return;
        getSubCategories();
    }, [props.category])

    const getSubCategories=async()=>{

        const apiBaseUrl = `http://localhost:4004/api/adverts/subcategories`   
        const data={category:props.category};     
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
        const apiBaseUrl = `http://localhost:4004/api/adverts/categories`        
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

    return (
        <div>
            <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" >
        <InputLabel id="label-category">Category</InputLabel>
        <Select id="category"  value={props.category}  onChange={(e)=>{props.setCategory(e.target.value)}} label="Category">
        {categories.map((category)=>            
          <MenuItem key={category.id} name={category.category} value={category.id}>{category.category}</MenuItem>
        )}
          </Select>
      </FormControl>
      <FormControl style={{ margin: 8, width: '50ch'}}   variant="outlined" >
        <InputLabel id="label-subcategory">Sub Category</InputLabel>
        <Select id="subcategory" value={props.subcategory} onChange={(e)=>{props.setSubCategory(e.target.value)}} label="Sub Category">
        {subCategories.map((subcategory)=>            
          <MenuItem key={subcategory.id} name={subcategory.subcategory} value={subcategory.id}>{subcategory.subcategory}</MenuItem>
        )}
        </Select>
      </FormControl>
        </div>
    )
}
