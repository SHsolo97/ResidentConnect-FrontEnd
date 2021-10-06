import  FacilityForm  from "../components/FacilityForm"
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const facilitystore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const AddFacility = () => {
    
    const onSubmit=(formValues)=>{
        console.log(formValues);
    }
    return (
        <>
         <Provider store={facilitystore}>
         <FacilityForm onSubmit={onSubmit}/>
         </Provider>
       </>
    )
}
