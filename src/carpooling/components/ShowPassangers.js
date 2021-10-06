import React from 'react'

import {useModelState} from '../../misc/custom-hooks';

import GroupIcon from '@mui/icons-material/Group';
import IconButton from '@mui/material/IconButton';
import  {ShowPassangersModel} from './ShowPassangersModel';
import {fetchMyRideRequestsByRideId} from '../actions/index';
import { connect } from 'react-redux';


export const ShowPassangers = ({...props}) => {
const { isOpen, open, close } = useModelState();
const [rideid,setRideid]=React.useState(props.rideid);


const showPassangers=()=>{
    console.log(rideid);

    props.fetchMyRideRequestsByRideId(rideid);
  console.log(props.ridereqs);
  console.log(props.users);
  open();

}
return (
<div>
  <IconButton color="primary" onClick={showPassangers}>
    <GroupIcon />
  </IconButton>
  {isOpen && props.ridereqs!=null &&   props.users!=null &&
  <ShowPassangersModel ridereqs={props.ridereqs} open={isOpen} handleclose={close} />
  }

</div>
)
}
const mapStateToProps = (state,ownProps) => {
    return {
     ridereqs: state.ridereqs,
     users: state.users

    };
};
export default connect(
    mapStateToProps,
    { fetchMyRideRequestsByRideId}
  
  )(ShowPassangers);