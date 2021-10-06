import React from 'react'
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import {useModelState} from '../../misc/custom-hooks';
import { RejectReasonModel } from './RejectReasonModel';


export const RejectRide = ({...props}) => {
    const { isOpen, open, close } = useModelState();
    const rejectRide=(data)=>
    {
        props.rejectRide(data);
    }
    return (
        <div>
             <PrimaryButton style={{marginLeft:'10px'}} onClick={open}>{props.rejectbuttonName} </PrimaryButton>
          {isOpen &&
       <RejectReasonModel   rejectRide={rejectRide}  open={isOpen} handleclose={close}/>
  }
       
        </div>
    )
}
