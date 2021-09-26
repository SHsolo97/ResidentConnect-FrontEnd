/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { useProfile } from '../../context/profile.context';


import { useHistory } from 'react-router-dom';
import { uploadImagesToFireStorage } from '../../misc/firestore';

import { Progress } from '../../shared/components/Progress';
import classifiedAPI from '../../misc/axios-calls/classifiedAPI';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import  AddClassifiedForm  from '../components/AddClassifiedForm';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const classifiedstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


export const AddClassified = () => {

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
 
  const { user } = useProfile();
  const communityid = user.communities[0];

  


  const addClassifieds = async (classifiedData) => {
    var apiBaseUrl = `/classifieds/create`

    await classifiedAPI.post(apiBaseUrl, classifiedData)
      .then(function (response) {
        if (response.status === 201) {

          console.log(response.data);
          setIsLoading(false);
        
          history.push('/classifieds');
        }

      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
    


      });
  }
  

 
  const setFormData = async (classified,file) => {
   // setIsLoading(true);
    const fileList = [file];
    const path = `${communityid}/classifieds`;
    //const imagefiles=await uploadImageToFireStorage();
    const imagefiles = await uploadImagesToFireStorage(path, fileList);

    const data = {};    
    data['communityid']= communityid;
    data['category']=classified.category;
    data['subcategory']=classified.subcategory;
    data['name']=classified.name;
    data['description']=classified.description;
    data['website']=classified.website;
    const phones=[];
    classified.phone.map(p=>{
      const ph={};
      ph['type']=p.type;
      ph['number']=p.number;
      ph['hours']=`${p.starttime} ${p.starttimetype}  to  ${p.endtime} ${p.endtimetype}`;
      phones.push(ph);

    })
      data.phone=phones;

      data.address=classified.address;
      data['emails']=classified.emails
      data['thumbnail'] = imagefiles[0].url
      console.log(data);
       await addClassifieds(data);

  }
 


 

return (
  <>
    <PageHeader>Add Classified</PageHeader>
   
    {isLoading ?
      <Progress /> :
      null
    }
       <Provider store={classifiedstore}>
          <AddClassifiedForm setFormData={setFormData} />
        </Provider>
   
  </>
)

}