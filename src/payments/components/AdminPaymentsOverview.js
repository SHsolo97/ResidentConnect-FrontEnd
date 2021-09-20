import React from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import BillCircles from '../components/BillCircles';
import PaymentGraph from './PaymentGraph';
import Grid from '@mui/material/Grid';


export const AdminPaymentsOverview = () => {
    return (
        <div>
            <Grid container spacing={3}>
      <Grid item xs={9}>
                 <PaymentGraph/>
                 </Grid>
                 <Grid item xs={3}>   
            <BillCircles/>
            </Grid>
            </Grid>
        </div>
    )
}
