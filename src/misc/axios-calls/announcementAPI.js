import axios from 'axios';
export default axios.create({
   baseURL: 'http://localhost:4010/api'
   //baseURL: 'https://716504ba-default-ingressrc-d980-548470991.ap-south-1.elb.amazonaws.com/api'
  //baseURL:getAPI.ANNOUNCEMENT.LOCAL
  //baseURL: 'https://residentsconnect-stg.srscloudapps.link/api'

});
