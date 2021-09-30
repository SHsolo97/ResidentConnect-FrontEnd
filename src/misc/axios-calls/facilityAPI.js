import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4008/api'
  //baseURL: 'https://residentsconnect-dev.srscloudapps.link/api'
});
