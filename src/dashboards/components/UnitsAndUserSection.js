import React from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import { fetchUsersOverview, fetchApartmentsOverview } from '../actions';
import { Paper } from '@material-ui/core';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export class UnitsAndUserSection extends React.Component {
    componentDidMount() {
        console.log(this.props.communityid);
        this.props.fetchUsersOverview(this.props.communityid);
        this.props.fetchApartmentsOverview(this.props.communityid);

        console.log(this.props.userSummary);
        console.log(this.props.apartmentsSummary);

    }
    renderUserData() {
        if (this.props.userSummary.length != 0) {
            return (
                <div>
                    <GroupsIcon style={{width:'50px',height:'50px'}} />

                    <div>  <span style={{fontWeight:'bold', fontSize:'20px'}}> {this.props.userSummary.total}  </span> users</div>
                    <div> {this.props.userSummary.admin} admins</div>
                    <div> {this.props.userSummary.resident} residents</div>
                </div>
            )
        }
            return (
                <div>
                    <GroupsIcon style={{width:'50px',height:'50px'}} />
                    </div>)
    }
    renderApartmentData() {
        if (this.props.apartmentsSummary!=null) {
            return (
                <div>
                                   <ApartmentIcon style={{width:'50px',height:'50px'}} />

                    <div> <span style={{fontWeight:'bold', fontSize:'20px'}}>  {this.props.apartmentsSummary.total} </span> units</div>
                    
                      
                       { this.props.apartmentsSummary.status.map(data=>
                            {
                                return <div> {data.count} {data.type}</div>   
                            })
                        }
                    
      
                </div>
            )
        }
        return (
            <div>
                <ApartmentIcon style={{width:'50px',height:'50px'}} />
                </div>)
    }

    render() {
        return (
                
                <Paper elevation={3} style={{width:'600px',height:'400px'}}>
                <SectionHeader>Units &amp; Users </SectionHeader>
                <Grid
  container
  direction="row"
  justifyContent="space-around"
  alignItems="center"
>
    {this.renderUserData()}
                <Divider orientation="vertical" flexItem />

                {this.renderApartmentData()}
                </Grid>
                </Paper>
            
        )
    }
}
const mapStateToProps = state => {

    return {
        userSummary: state.userSummary,
        apartmentsSummary: state.apartmentsSummary
    };
};

export default connect(
    mapStateToProps,
    { fetchUsersOverview, fetchApartmentsOverview }
)(UnitsAndUserSection);