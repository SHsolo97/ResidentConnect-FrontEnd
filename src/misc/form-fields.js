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
      <Select native {...input} {...custom} inputProps={{
        name: {name},
        id: {name}
      }}>
        {children}
      </Select>
      {renderFromHelper({ touched, error })}

    </FormControl>

    );