import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 300000,
  timeoutErrorMessage: 'timeout',
});

export default api;