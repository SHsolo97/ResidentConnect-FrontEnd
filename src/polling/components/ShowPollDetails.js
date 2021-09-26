import React from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { SectionHeader } from '../../shared/components/SectionHeader';
import PollResultBar from '../../shared/components/PollResultBar';
export const  ShowPollDetails =({...props})=> {
   
        const renderPollResults=(poll)=>{
            if(poll==null)
            return null;
            const totalParticipants=poll.answeredby.length;
            return(
                <Paper elevation={1} >
                    
                    {poll.options.map(option=>{
                        let   percentail=0;
                        if(totalParticipants!==0)
                                percentail= Math.round(((parseInt(option.votes)/parseInt(totalParticipants))*100),1);
                        
                        return <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                               <PollResultBar  progress={percentail} height={20} /> 
<Typography variant="body2" gutterBottom>{percentail}% </Typography>
                                             </Grid>
                    })}
                    <Typography variant="h5 " gutterBottom component="div">  Total Participants {totalParticipants} </Typography>

                </Paper>
            )
        }
        const renderPollData=(poll)=>{
            if(poll==null)
            return null;
            return(
                <Paper elevation={1} >
                    <Typography variant="h5 " gutterBottom component="div"> {poll.question} </Typography>
                    {poll.options.map(option=>{
                        return     <Typography variant="body2" gutterBottom> <span style={{fontWeight:'bold'}} > Option: </span> {option.description} </Typography>
                    })}
                
                </Paper>
            )
        }

        return (
        <div>
            <SectionHeader> Poll Details </SectionHeader>
            {renderPollData(props.poll)}
            <SectionHeader> Poll Results </SectionHeader>
            {renderPollResults(props.poll)}

        </div>
    )
             
}
