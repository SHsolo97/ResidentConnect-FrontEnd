import React from 'react'
import { useHistory } from 'react-router'
import { PageHeader } from '../../shared/components/PageHeader'
import PrimaryButton from '../../shared/components/PrimaryButton'

export const ApartmentServices = ({children,...props}) => {
    const history=useHistory();
  
      const handleSubmit=(e)=>{
        history.push('/settingsR');
    }
    const handleBack=(e)=>{
        props.handleBack();
    }
     return (
        <>
            <PageHeader>{children}</PageHeader>
            <PrimaryButton  onClick={handleBack}> Back </PrimaryButton>
            <PrimaryButton  onClick={handleSubmit}> Finish </PrimaryButton>
        </>
    )
}
