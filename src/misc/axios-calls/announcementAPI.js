import axios from 'axios';
export default axios.create({
  //baseURL: 'http://localhost:4010/api'
  //baseURL:getAPI.ANNOUNCEMENT.LOCAL
  baseURL: 'https://residentsconnect-stg.srscloudapps.link/api'

});
