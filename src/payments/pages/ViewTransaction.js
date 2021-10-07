import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import {BillDetailsCard} from '../components/BillDetailsCard';
import ReceiptDetailsCard from '../components/ReceiptDetailsCard';
export const ViewTransaction = ({...props}) => {
    const {bill}=props.location.state

    return (
        <div>
            <PageHeader> View Transaction</PageHeader>
            <BillDetailsCard bill={bill}/>
            <ReceiptDetailsCard bill={bill}/>
        </div>
    )
}
