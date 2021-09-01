import React,{useState} from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import {TextField,Button} from '@material-ui/core';
import { useProfile } from '../../context/profile.context';
import { makeStyles } from '@material-ui/core/styles';

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
import { storage } from '../../misc/firebase';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useHistory } from 'react-router';

const MAX_FILE_SIZE = 1000 * 1024 * 5;

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
  const [file, setFile] = useState();
  const history=useHistory();
  const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();
    const {user}=useProfile();
    const  communityid =user.communities[0];
    const [ categories,setCategories]=useState([]);
    const [ subCategories,setSubCategories]=useState([]);
   
    const uploadImageToFireStorage = async () => {
      const fileList=[file];
      try {
          setIsLoading(true);
          const uploadPromises = fileList.map(f => {
            console.log(f.name);
              return storage
                  .ref(`${communityid}/classifieds`)
                  .child(Date.now() + f.name)
                  .put(f,
                      {
                        contentType: `image/jpeg`,
                        cacheControl: `public, max-age=${3600 * 12 * 3}`
                      });

          });
          const uploadSnapshots = await Promise.all(uploadPromises);
          const shapePromises = uploadSnapshots.map(async snap => {
              return {
                  contentType: snap.metadata.contentType,
                  name: snap.metadata.name,
                  url: await snap.ref.getDownloadURL()
              }
          })
          console.log(shapePromises);
          const files = await Promise.all(shapePromises);
          console.log(files);
          setClassified((prevState)=>{
            return{...prevState,thumbnail:files[0].url}});
         // await afterUpload(files);
          setIsLoading(false);
         return files;
        
        
      }

      catch (err) {
          setIsLoading(false);
          console.log(err);
      }
  }
  
    const [classified,setClassified]=useState({
        communityid:communityid,
        thumbnail:'', 
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
        
     console.log(classified);
  }, [file,classified])
    useEffect(() => {
        
        getCategories();
    }, [])
    useEffect(() => {
        
        getSubCategories();
    }, [classified.category])

    const addClassifieds=async()=>{
      var apiBaseUrl = `http://localhost:4005/api/classifieds/create`   
           
      await axios.post(apiBaseUrl,classified )
           .then(function (response) {
               if (response.status === 200)
              {           
                
                  console.log(response.data);
               
              }
         
           })
           .catch(function (error) {
               console.log(error);
               return(null);
  
           });
    }
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
    const addFile=(file)=>{
      console.log('inside addFile')
      console.log(file);
     
        setFile(file);
      
      
    }
    const addClassified=async()=>{
      const imagefiles=await uploadImageToFireStorage();
      setClassified((prevState)=>{
        return{...prevState,thumbnail:imagefiles[0].url}});
        await addClassifieds();
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
      const handleCancel=(event)=>{
        history.push('/classifieds');

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

       <ImageUpload  addFile={addFile} id="classifieldIamge" errorText="Upload Image" />
       <PrimaryButton onClick={addClassified}>Submit</PrimaryButton>
       <PrimaryButton onClick={handleCancel}>Cancel</PrimaryButton>

          </form>
          </>
          )
    
}
