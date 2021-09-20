import React from 'react';
import { Switch } from 'react-router-dom';
import Announcements from './announcements/pages/Announcements';
import {Community} from './apartments/pages/Community';
import Registration from './authentication/pages/Registration';
import SignIn from './authentication/pages/SignIn';
import BuyAndSell from './buyandsell/pages/BuyAndSell';
import CarPooling from './carpooling/pages/CarPooling';
import AdminChatroom from './chatrooms/pages/AdminChatroom';
import ResidentChatroom from './chatrooms/pages/ResidentChatroom';
import {Classifieds} from './classifieds/pages/Classifieds';
import AdminContacts from './contacts/pages/AdminContacts';
import CreateContact from './contacts/pages/CreateContact';
import ResidentContacts from './contacts/pages/ResidentContacts';
import AdminDashboard from './dashboards/pages/AdminDashboard';
import ResidentDashboard from './dashboards/pages/ResidentDashboard';
import Events from './eventmgmt/pages/Events';
import AdminFacility from './facilitybooking/pages/AdminFacility';
import ResidentFacility from './facilitybooking/pages/ResidentFacility';
import PrivateRoute from './layouts/PrivateRoute';
import PublicRoute from './layouts/PublicRoute';
import MaintenanceOverview from './maintenance/pages/MaintenanceOverview';
import AdminPayments from './payments/pages/AdminPayments';
import ResidentPayments from './payments/pages/ResidentPayments';
import Pollings from './polling/pages/Pollings';
import AdminVisitors from './visitormgmt/pages/AdminVisitors';
import ResidentVisitors from './visitormgmt/pages/ResidentVisitors';
import CommunityProfileSetting from './apartments/pages/CommunityProfileSetting';
import SettingsRoute from './layouts/SettingsRoute';
import ResidentProfileSetting from './apartments/pages/ResidentProfileSetting'
import { ProfileProvider } from './context/profile.context';
import { ProfileSelection } from './authentication/pages/ProfileSelection';
import { AddClassified } from './classifieds/pages/AddClassified';
import { ViewClassified } from './classifieds/pages/ViewClassified';
import { PostAd } from './buyandsell/pages/PostAd';
import { AddFacility } from './facilitybooking/pages/AddFacility';
import SamplePage from './sample/SamplePage';
import { CommunityProvider } from './context/community.context';
import { ApartmentProvider } from './context/apartment.context';
import { ResidentApartmentDetails } from './apartments/pages/ResidentApartmentDetails';
import ProfileSetting from './profiles/pages/ProfileSetting';
import { MyAds } from './buyandsell/pages/MyAds';
import { AdvertsProvider } from './context/adverts.context';
import { AdDetails } from './buyandsell/pages/AdDetails';
import { UpdateAdDetails } from './buyandsell/pages/UpdateAdDetails';
import {ResidentApartmentSettings} from './profiles/pages/ResidentApartmentSettings';
import UpdateCommunityProfile from './profiles/pages/UpdateCommunityProfile';
import {InitiatePayment}  from './payments/pages/InitiatePayment';
import { PayBill } from './payments/pages/PayBill';

function App() {
 return(
 <ProfileProvider>
   <CommunityProvider>
     <ApartmentProvider>
   <Switch>
   <PublicRoute path="/signin">
     <SignIn />
    
   </PublicRoute>
   <PublicRoute path="/registration">
   <Registration />
   </PublicRoute>
   <SettingsRoute path="/settingsA" component={CommunityProfileSetting} />
   <SettingsRoute path="/settingsR" component={ResidentProfileSetting} />
   <SettingsRoute path="/apartmentDetailsR" component={ResidentApartmentDetails}/>
   
   <SettingsRoute path="/selectprofile" component={ProfileSelection}/>
   <PrivateRoute path="/dashboardR" component={ResidentDashboard} />
   <PrivateRoute path="/dashboardA" component={AdminDashboard} />
   <PrivateRoute path="/buyandsell" component={BuyAndSell} />
   <PrivateRoute path="/events" component={Events} /> 
   <PrivateRoute path="/classifieds" component={Classifieds} />
   <PrivateRoute path="/carpolling" component={CarPooling} />
   <PrivateRoute path="/apartments" component={Community} />
   <PrivateRoute path="/announcement" component={Announcements} />
   <PrivateRoute path="/chatroomR" component={ResidentChatroom} />
   <PrivateRoute path="/chatroomA" component={AdminChatroom} />
   <PrivateRoute path="/paymentA" component={AdminPayments} />
   <PrivateRoute path="/paymentR" component={ResidentPayments} />
   <PrivateRoute path="/visitorsR" component={ResidentVisitors} />
   <PrivateRoute path="/visitorsA" component={AdminVisitors} />
   <PrivateRoute path="/contactsA" component={AdminContacts} />
   <PrivateRoute path="/contactsR" component={ResidentContacts} />
   <PrivateRoute path="/facilityR" component={ResidentFacility} />
   <PrivateRoute path="/facilityA" component={AdminFacility} />
   <PrivateRoute path="/pollings" component={Pollings} /> 
   <PrivateRoute path="/maintenance" component={MaintenanceOverview}/>
   <PrivateRoute path="/createContact" component={CreateContact}/>
   <PrivateRoute path="/addClassified" component={AddClassified} />
   <PrivateRoute path="/viewClassified" component={ViewClassified} />
   <PrivateRoute path="/postAd" component={PostAd} />
   <PrivateRoute path="/addFacility" component={AddFacility}/>
   <PrivateRoute path="/profile" component={ProfileSetting}/>
   <PrivateRoute path="/samplePage" component={SamplePage}/>
   <PrivateRoute path="/apartmentprofile" component={ResidentApartmentSettings}/>

     <PrivateRoute path="/myads" component={MyAds}/>
     <PrivateRoute path="/adDetails" component={AdDetails}/>
     <PrivateRoute path="/updateAdDetails"  component={UpdateAdDetails}/>
     <PrivateRoute path="/updateCommunityProfile" component={UpdateCommunityProfile} />
     <PrivateRoute path="/initiatePayment" component={InitiatePayment} />
     <PrivateRoute path="/payBill" component={PayBill} />
  
 </Switch>
 </ApartmentProvider>
 </CommunityProvider>
 </ProfileProvider>
 );
}

export default App;
