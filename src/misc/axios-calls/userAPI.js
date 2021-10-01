import axios from 'axios';

export default axios.create({
  //baseURL: 'http://localhost:4002/api'
  baseURL: 'https://residentsconnect-stg.srscloudapps.link/api'
});
