import React from 'react'
import { useModelState } from '../../misc/custom-hooks'
import { Button } from '@material-ui/core'
import { SellerModel } from '../components/SellerModel'

export const ShowSellerProfile = ({...props}) => {
    const { isOpen, open, close } = useModelState();
 
    return (
        <div>
            <Button onClick={open}>View Profile</Button> 
            {isOpen &&
              <SellerModel sellerAddress={props.sellerAddress} seller={props.seller} handleClose={close} open={open} />

            }
        </div>
    )
}
