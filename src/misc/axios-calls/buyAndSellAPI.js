import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4004/api'
  //baseURL: 'https://residentsconnect-dev.srscloudapps.link/api'
});
