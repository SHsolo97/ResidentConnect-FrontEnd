import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import {BillDetailsCard} from '../components/BillDetailsCard';
export const ViewTransaction = ({...props}) => {
    const {bill}=props.location.state

    return (
        <div>
            <PageHeader> View Transaction</PageHeader>
            <BillDetailsCard bill={bill}/>

        </div>
    )
}
