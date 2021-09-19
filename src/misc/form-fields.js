import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Rating from '@material-ui/lab/Rating';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@material-ui/core/Select';
import DatePicker from '@mui/lab/DatePicker';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'
import ImageUpload from '../classifieds/components/ImageUpload';

export const renderImageField=({input,value,label, ...custom}) => (
  
  <ImageUpload {...custom}  /> 
)
export const renderDateField=({ input, value,label, variant,meta: { touched, error,invalid }, ...custom },
    ) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker {...custom} 
        label={label}
        value={input.value}
        onChange={(value)=>input.onChange(value)}
        
              renderInput={(value) => <TextField {...value} 
              helperText={touched && error} error={touched && invalid}  variant={variant} />}
            />
            </LocalizationProvider>
             
    );
    
export const renderFromHelper = ({ touched, error }) => {
if (!(touched && error)) {
return
} else {
return <FormHelperText>{touched && error}</FormHelperText>
}
}
export const renderTextField = (
{ input, label, meta: { touched, error,invalid }, ...custom },
) => (
<TextField label ={label} helperText={touched && error} error={touched && invalid} {...input} {...custom} />
);

export const renderRatingField=({input,...rest})=>(
<Rating {...input} {...rest} />
);
export const renderCheckbox = ({ input, ...rest }) => (
<FormControlLabel {...input} {...rest} value={input.value} onChange={(event, value)=> input.onChange(value)}
  />
  );

  export const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup {...input} {...rest} onChange={(event, value)=> input.onChange(value)}
    />
    );

    export const renderSelectField = (
    { input,name,
    label,variant,
    meta: { touched, error },
    children,
    ...custom },
    ) => (
    <FormControl variant={variant} error={touched && error}>

      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select  {...input} {...custom} inputProps={{
        name: {name},
        id: {name}
      }}>
        {children}
      </Select>
      {renderFromHelper({ touched, error })}

    </FormControl>

    );

    /*********************** Field Level validation **********************************/
    
    export const exactLength = length => value =>
    value && value.length !== length ? `Must be ${length} characters` : undefined
    
  export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
  
  export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
  
  export const required = value => (value ? undefined : 'Required')
  
  export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

  export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

  export const maxValue = max => value =>
  value && value > max ? `Must be less than  ${max}` : undefined 

  export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

  export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
  
export const phoneNumber = value =>
  value && !/^([0-9]{3}-[0-9]{3}-[0-9]{4})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export const pinNumber = value =>
    value && !/^([0-9]{6})$/i.test(value)
      ? 'Invalid pin code number, must be 6 digits'
      : undefined
      /*********************** Normalize Field  validation **********************************/
export const normalizePhone = (value, previousValue) => {
        if (!value) {
          return value
        }
        const onlyNums = value.replace(/[^\d]/g, '')
        if (!previousValue || value.length > previousValue.length) {
          // typing forward
          if (onlyNums.length === 3) {
            return onlyNums + '-'
          }
          if (onlyNums.length === 6) {
            return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
          }
        }
        if (onlyNums.length <= 3) {
          return onlyNums
        }
        if (onlyNums.length <= 6) {
          return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
        }
        return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
      }

      export const normalizeCardNumber = (value, previousValue) => {
        if (!value) {
          return value
        }
        const onlyNums = value.replace(/[^\d]/g, '')
        if (!previousValue || value.length > previousValue.length) {
          // typing forward
          if (onlyNums.length === 4) {
            return onlyNums + '-'
          }
          if (onlyNums.length === 8) {
            return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4) 
          }
          if (onlyNums.length === 12) {
            return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8,17  )
          }
          if (onlyNums.length === 16) {
            return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8,12) + '-' + onlyNums.slice(12,17)
          }
         
        }
        if (onlyNums.length <= 4) {
          return onlyNums
        }
        if (onlyNums.length <= 8) {
          return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4)
        }
        if (onlyNums.length <= 12) {
          return onlyNums.slice(0, 4) + '-' +  onlyNums.slice(4, 8) + '-' + onlyNums.slice(8)
        }
        return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 8) + '-' + onlyNums.slice(8, 12)+ '-' + onlyNums.slice(12)
      }
  export const upper = value => value && value.toUpperCase()
  export const lower = value => value && value.toLowerCase()