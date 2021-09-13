import React from 'react'
import { useProfile } from '../../context/profile.context'
import {Button} from '@material-ui/core';
import { PageHeader } from '../../shared/components/PageHeader';
import { useHistory } from 'react-router';
import { useCommunity } from '../../context/community.context';
import { useApartment } from '../../context/apartment.context';
import PrimaryButton from '../../shared/components/PrimaryButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


export const ProfileSelection = () => {
const {user,isLoading}=useProfile();
const {community,communityList} = useCommunity();
const {apartment,apartmentList} = useApartment();
console.log(community);
console.log(communityList);
console.log(apartment);
console.log(apartmentList);
const history=useHistory();
const handleSubmit=()=>{
if(user.type==='admin')

if(user.profilecompletion)
history.push('/dashboardA');
else
history.push('settingsA');
else
if(user.profilecompletion)
history.push('/dashboardR');
else
history.push('settingsR');

}

return (
<div>
  <PageHeader> Select Profile </PageHeader>
  <RadioGroup row name="community">


    <Grid container direction="column" justifyContent="space-around" alignItems="center">
      { (user.type==='admin')
      ? communityList.map((community)=>

      <>
        <Paper elevation={3} style={{padding:'20px', width:'400px'}}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Radio value={community.id} color="primary" />
            <div>
              <div> {community.name}</div>
              <br />
              <div> {community.builder}</div>

              <br />
            </div>
          </Grid>
        </Paper>
      </>)
      :
      apartmentList.map((apartment)=>

      <>
        <Paper elevation={3} style={{padding:'20px', width:'400px'}}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Radio value={apartment.id} color="primary" />

        
            <div>{apartment.aptnum}</div>
            <br />
          </Grid>
        </Paper>
      </>)
      }
    </Grid>
  </RadioGroup>


  <PrimaryButton onClick={handleSubmit}> Next </PrimaryButton>

</div>);
}