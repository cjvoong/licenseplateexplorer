// axiosConfig.js
const axios = require('axios');

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.error('Error Response:', error.response);
  return Promise.reject(error);
});

module.exports = axios;
