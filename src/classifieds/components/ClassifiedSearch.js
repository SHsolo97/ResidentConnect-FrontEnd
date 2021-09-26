/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import classifiedAPI from '../../misc/axios-calls/classifiedAPI';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Paper } from '@material-ui/core';
import { useCommunity } from '../../context/community.context';

export const ClassifiedSearch = ({...props}) => {
    const {community} = useCommunity();
    const communityid=community._id;
    const[category,setCategory]=useState('');
    const[subCategory,setSubCategory]=useState('');

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
  

    const getSubCategories = async () => {

        var apiBaseUrl = `/classifieds/subcategories`
        const data = { category };
        await classifiedAPI.post(apiBaseUrl, data)
          .then(function (response) {
            if (response.status === 200) {
    
              setSubCategories(response.data.subcategories);
            }
    
          })
          .catch(function (error) {
            console.log(error);
           
    
          });
      }
      const getCategories = async () => {
    
        var apiBaseUrl = `/classifieds/categories`
        await classifiedAPI.get(apiBaseUrl)
          .then(function (response) {
            if (response.status === 200) {
    
              setCategories(response.data.categories);
            }
    
          })
          .catch(function (error) {
            console.log(error);
           
          });
      }
      useEffect(() => {

        getCategories();
      }, [])
      useEffect(() => {
    
        if (category === '')
          return;
        getSubCategories();
        setSubCategory('');
      }, [category])
      const searchClassified=()=>{
          const searchQuery={};
          searchQuery['communityid']=communityid;
          if(category!=='')
          searchQuery['category']=category;
          if(subCategory!=='')
          searchQuery['subcategory']=subCategory;
          props.setSearchData(searchQuery);

        }
      
      return (
        <Paper>
            <SectionHeader> Search</SectionHeader>
            <form>
      <Grid container direction="column" justifyContent="space-around" alignItems="flex-start">
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <FormControl style={{ margin: 8, width: '50ch' }} variant="outlined" >
            <InputLabel >Category</InputLabel>
            <Select id="category" value={category} onChange={(e)=>setCategory(e.target.value)} label="Category">
ca
              {categories.map((category) =>
                <MenuItem key={category.id} name={category.category} value={category.id}>{category.category}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl style={{ margin: 8, width: '50ch' }} variant="outlined" >
            <InputLabel >Sub Category</InputLabel>
            <Select id="subcategory" value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} label="Sub Category">
              {subCategories.map((subcategory) =>
                <MenuItem key={subcategory.id} name={subcategory.subcategory} value={subcategory.id}>{subcategory.subcategory}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <PrimaryButton onClick={searchClassified}> Search </PrimaryButton>
        </Grid>
        </form>
        </Paper>
    )
}
