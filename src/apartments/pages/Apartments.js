import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import PrimaryButton from '../../shared/components/PrimaryButton'

export const Apartments = ({children,...props}) => {
    const handleSubmit=(e)=>{
        props.handleNext();
    }
    const handleBack=(e)=>{
        props.handleBack();
    }
     return (
        <>
        <PageHeader>{children}</PageHeader>
        <PrimaryButton  onClick={handleBack}> Back </PrimaryButton>
        <PrimaryButton  onClick={handleSubmit}> Next </PrimaryButton>
        </>
    )
}
