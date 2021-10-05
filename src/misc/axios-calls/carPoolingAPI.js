import axios from 'axios';

export default axios.create({
  //baseURL: 'http://localhost:4006/api'
   baseURL: 'https://716504ba-default-ingressrc-d980-548470991.ap-south-1.elb.amazonaws.com/api'
  //baseURL: 'https://residentsconnect-stg.srscloudapps.link/api'
});
