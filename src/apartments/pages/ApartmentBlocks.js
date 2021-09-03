
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useState,useCallback} from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { orange } from '@material-ui/core/colors';
import {Button} from '@material-ui/core';
import { PageHeader } from '../../shared/components/PageHeader'
import PrimaryButton from '../../shared/components/PrimaryButton';

const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
    field: 'block',
    headerName: 'Block',
    width: 150,
    editable: true,
  },
  {
    field: 'floors',
    headerName: 'Floors',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'flats',
    headerName: 'Flats',
    type: 'number',
    width: 110,
    editable: true,
  }
];

 export const ApartmentBlocks =({children,...props}) => {
 const [rows,setRows]=useState([]);
 const[id,setId]=useState(1);
 
 const addBlock=useCallback(() => {
    console.log(id);
    console.log(rows);
    setId(id+1,
    setRows([...rows,{ id:id, block: '', floors: 0, flats: 0}]));
    console.log(id);
}, [rows])
const handleSubmit=(e)=>{
  props.handleNext();
}
const handleBack=(e)=>{
  props.handleBack();
}
  return (
      <>
      <PageHeader>{children}</PageHeader>  
      <Button   variant="contained" style ={{backgroundColor: orange[500] }} 
               startIcon={<AddCircleOutlineIcon />} onClick={addBlock}>Add Block</Button>
    <div style={{ height: 400, width: '80%' }}>
          
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    <PrimaryButton  onClick={handleBack}> Back </PrimaryButton>
    <PrimaryButton  onClick={handleSubmit}> Next </PrimaryButton>

    </>
  );
}

