/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from 'react'
import { Field, FieldArray, reduxForm } from "redux-form";
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import classifiedAPI from '../../misc/axios-calls/classifiedAPI';
import PrimaryButton from '../../shared/components/PrimaryButton';
import ImageUpload from '../components/ImageUpload';
import {PhoneItem} from '../components/PhoneItem';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';

import {required,email,pinNumber,minLength, renderTextField,renderSelectField} from "../../misc/form-fields";
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
 
export const AddClassifiedForm = ({...props}) => {
    let file = null;
    const history = useHistory();
    const [category,setCategory]=useState(null)
    const [categories, setCategories] = useState([]);

    const [ setSubCategory] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const { error, submitting} = props
          const getSubCategories = async () => {

        var apiBaseUrl = `/classifieds/subcategories`
        const data = { category };
        await classifiedAPI.post(apiBaseUrl, data)
          .then(function (response) {
            if (response.status === 200) {
    
              setSubCategories(response.data.subcategories);
              setSubCategory(response.data.subcategories[0])
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
              setCategory(response.data.categories[0])
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
      }, [category])

      const handleCancel = (event) => {
        history.push('/classifieds');
    
      }
      const addFile = (imagefile) => {
        file = imagefile;
      }
      const onSubmit=(formValues)=>
        {
          
            console.log("submission");
          console.log(formValues);
          console.log(file);
          props.setFormData(formValues,file);
         }
     
    
        return (
        <div>
            <form onSubmit={props.handleSubmit(onSubmit)}>
           

            <Grid container direction="column" justifyContent="space-around" alignItems="flex-start">
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">

        <Field name="category" label="category"   validate ={[required]} style={{ margin: 8, width: '40ch' }} component={renderSelectField}  variant="outlined" onChange={(e)=>setCategory(e.target.value)} >
        {categories.map((category) =>
                <MenuItem  key={category.id} value={category.id} >{category.category}</MenuItem>
        )}
          </Field>
             <Field   validate ={[required]} style={{ margin: 8, width: '40ch' }} name="subcategory" component={renderSelectField} label=" Sub Category" variant="outlined">
        {subCategories.map((subcategory) =>
                <MenuItem  key={subcategory.id} value={subcategory.id} >{subcategory.subcategory}</MenuItem>
        )}
         </Field>
       </Grid>
   <Field id="name"  validate ={[required, minLength(5)]}  style={{ margin: 8, width: '100ch' }} name="name" label="Name"  component={renderTextField} variant="outlined" />
            <Field id="description" validate ={[required]}  style={{ margin: 8, width: '100ch' }}  name="description" label="Description" component={renderTextField} variant="outlined" />

            <Field id="address" validate ={[required]}  style={{ margin: 8, width: '100ch' }} name="address.addressline" label="Address" component={renderTextField} variant="outlined" />
            <Field id="area"  validate ={[required]} style={{ margin: 8, width: '100ch' }} name="address.area" label="Area" component={renderTextField} variant="outlined" />
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
             <Field id="city"  validate ={[required]}  style={{ margin: 8, width: '35ch' }} name="address.city" label="City" component={renderTextField} variant="outlined" />
            <Field id="state"  validate ={[required]} style={{ margin: 8, width: '35ch' }} name="address.state" label="State" component={renderTextField} variant="outlined" />
            <Field id="pincode" validate ={[required,pinNumber]}  style={{ margin: 8, width: '25ch' }} name="address.pincode" label="Pin" component={renderTextField} variant="outlined" />
            </Grid>

            <Field id="website"  validate ={[required]} style={{ margin: 8, width: '100ch' }} name="website" label="website" 
            component={renderTextField} variant="outlined"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageTwoToneIcon />
                  </InputAdornment>
                ),
              }} />
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Field id="email1" validate ={[required,email]} name="emails[0]" style={{ margin: 8, width: '50ch' }} label="Email1" component={renderTextField} variant="outlined" />

             <Field id="email2" validate ={[email]} name="emails[1]" style={{ margin: 8, width: '50ch' }} label="Email2" component={renderTextField} variant="outlined" />
           
              </Grid>
            <FieldArray   name="phone" component={PhoneItem}/>
            <ImageUpload addFile={addFile} name="file" id="classifieldIamge" errorText="Upload Image" />
      </Grid>
      {error && <strong>{error}</strong>}

      <Grid container direction="row" justifyContent="center" alignItems="center">
        <PrimaryButton type="submit"  disabled={submitting} >Submit</PrimaryButton>
        <PrimaryButton onClick={handleCancel}>Cancel</PrimaryButton>
      </Grid>
    </form>
        </div>
    )
}

export default reduxForm({
    form: "classifiedForm", // a unique identifier for this form
    
  })(AddClassifiedForm);