import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import ReceiptDetailsCard from '../components/ReceiptDetailsCard';
import Paper from  '@material-ui/core/Paper';

export const ViewTransaction = ({...props}) => {
    const {bill}=props.location.state

    return (
        <div>
            <PageHeader> View Transaction</PageHeader>
           
            <Paper style={{width:'1000px'}}>
            <ReceiptDetailsCard bill={bill}/>
            </Paper>
        </div>
    )
}
