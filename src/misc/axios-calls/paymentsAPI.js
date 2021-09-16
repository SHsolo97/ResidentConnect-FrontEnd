import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4012/api'
});
