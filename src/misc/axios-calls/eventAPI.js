import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4003/api/events'
});