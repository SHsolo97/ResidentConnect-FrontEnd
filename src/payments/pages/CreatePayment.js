import React,{useEffect} from 'react'
import CreatePaymentForm from '../components/CreatePaymentForm';

import { useProfile } from "../../context/profile.context";
import paymentsAPI from '../../misc/axios-calls/paymentsAPI';
import { connect } from 'react-redux';
import {fetchResidentsOfCommunity,fetchCommunityById,fetchApartmentsByCommunityid} from '../actions';
import { useCommunity } from '../../context/community.context';
export const CreatePayment = ({...props}) => {
    const {user}=useProfile();
    //const communityid=user.communities[0];
    const {community}=useCommunity();
    const communityid=community._id;
   
    useEffect(() => {
        props.fetchResidentsOfCommunity(communityid);
        props.fetchApartmentsByCommunityid(communityid);
        props.fetchCommunityById(communityid)
    }, [])

    const initiatePayments=async(paymentsdata)=>{
        var apiBaseUrl = `/payments/create`;

        await paymentsAPI
          .post(apiBaseUrl, paymentsdata)
          .then(function (response) {
            if (response.status === 201) {
              console.log(response.data);
              return response;
            }
          })
          .catch(function (error) {
            console.log(error);
           
          });

    }

    const setFormData=(data)=>{
        console.log(data);  
        let paymentsdata=[];

        props.apartments.map(apartment=>{
            let paymentdata={...data};
            paymentdata['communityid']=props.community._id;
            paymentdata['communityname']=props.community.name;
            paymentdata['apartmentid']=apartment._id;
            paymentdata['aptnum']=apartment.aptnum;
            
            paymentsdata.push(paymentdata);
        })
        console.log(paymentsdata);
        initiatePayments(paymentsdata);
    }
    return (
        <div>
             
                <CreatePaymentForm setFormData={setFormData}/>
            
        </div>
    )
}
const mapStateToProps = state => {
    return { residents: state.residents ,
        apartments:state.apartments,
        community:state.community
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchResidentsOfCommunity ,fetchApartmentsByCommunityid,fetchCommunityById }
  )(CreatePayment);
  