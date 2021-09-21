import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader';
import { useProfile } from '../../context/profile.context'
import { useApartment } from '../../context/apartment.context';
import { Divider } from '@mui/material';
import { useCommunity } from '../../context/community.context';

const ResidentDashboard = () => {
  return (
    <>
     <PageHeader>Resident Dashboard</PageHeader>     
     </>
)
}

export default ResidentDashboard
