import axios from 'axios';

export default axios.create({
  //baseURL: getAPI.ADVERT.LOCAL
  //baseURL: 'http://localhost:4004/api'
  baseURL: 'https://residentsconnect-stg.srscloudapps.link/api'
});
