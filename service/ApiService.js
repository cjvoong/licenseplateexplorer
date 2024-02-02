// apiService.js
const axios = require('../util/axiosConfig'); // Adjust the path accordingly

async function callExternalApi(url, data, headers) {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  callExternalApi,
};
