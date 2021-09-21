import React from 'react'
import { Paper } from '@material-ui/core';
import { SectionHeader } from '../../shared/components/SectionHeader';

export const HelpDeskSection = () => {
    return (
        <Paper elevation={3} style={{width:'600px',height:'400px'}}>
            <SectionHeader> Helpdesk Tracker</SectionHeader>
        </Paper>
    )
}
