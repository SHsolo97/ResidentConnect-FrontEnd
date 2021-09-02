import React from 'react'
import { useHistory } from 'react-router'
import { PageHeader } from '../../shared/components/PageHeader'
import PrimaryButton from '../../shared/components/PrimaryButton'

export const ResidentApartmentDetails = () => {
    const history=useHistory();
    const handleSubmit=(event)=>
    {
        history.push('/dashboardR');

    }
    return (
        <div>
            <PageHeader> Apartment Details</PageHeader>
            <PrimaryButton onClick={handleSubmit}> Next </PrimaryButton>

        </div>
    )
}
