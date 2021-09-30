import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4006/api'
  //baseURL: 'https://residentsconnect-dev.srscloudapps.link/api'
});
