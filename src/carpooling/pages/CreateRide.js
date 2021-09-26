import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import CreateRideForm from '../components/CreateRideForm';
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context';
import carPoolingAPI from '../../misc/axios-calls/carPoolingAPI';
import { uploadImagesToFireStorage } from '../../misc/firestore';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const carpollStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const CreateRide = () => {
    const {community} =useCommunity();
    const {user}=useProfile();
        const createRide = async (data) => {
            var apiBaseUrl = `/carpoolings/rides/create`
        
            await carPoolingAPI.post(apiBaseUrl, data)
              .then(function (response) {
                if (response.status === 201) {
        
                  console.log(response.data);
                  
                }
        
              })
              .catch(function (error) {
                console.log(error);
            
        
        
              });
          }
          
        const onSubmit=async (formValues,file)=>{
        console.log(formValues);
        const fileList = [file];
        const path = `${community._id}/carpooling/${user._id}`;
        //const imagefiles=await uploadImageToFireStorage();
        const imagefiles = await uploadImagesToFireStorage(path, fileList);
        const data={};
        data['communityid']=community._id;
        data['creator']=user._id;
        data['car']=formValues.car;
        data['amt']=formValues.amt;
        data['source']=formValues.source;
        data['destination']=formValues.destination;
        let stoppoints=formValues.stoppoints.slice();
        stoppoints.push(formValues.source.area);
        stoppoints.push(formValues.destination.area);
        data['stoppoints']=stoppoints;
        data['ridedatetime']=formValues.ridedatetime;
        data['seats.available']=formValues.seats;
        data['status']='active';
        data['contact']=user.phone[0].number;
        data['thumbnail'] = imagefiles[0].url

        console.log(data);
        createRide(data);


    }
    return (
        <div>
                  <PageHeader>Create Ride</PageHeader> 
            <Provider store={carpollStore}>
                    <CreateRideForm onSubmit={onSubmit} />
                </Provider>
        </div>
    )
}
