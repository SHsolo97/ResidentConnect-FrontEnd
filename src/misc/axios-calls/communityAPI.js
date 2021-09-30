import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000/api'
  //baseURL: 'https://residentsconnect-dev.srscloudapps.link/api'
});
