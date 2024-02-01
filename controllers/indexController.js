const axios = require('axios');
require('dotenv').config();

const indexController = {};

indexController.renderForm = (req, res) => {
  // Render the form view
  res.render('form', { title: 'Search for your license plate' });
};

// Set up Axios interceptors
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

indexController.submitForm = async (req, res) => {
  try {
    // Retrieve data from the form submission
    const registrationNumber = req.body.registrationNumber;

    const headers = {
      'x-api-key': process.env.API_KEY,
      'Content-Type': 'application/json',
      // Add any other headers as needed
    };

    // Example API call to submit the form data (replace with your API endpoint)
    const apiResponse = await axios.post('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
      { registrationNumber },
      { headers }
    );

    // Extract relevant data from the API response
    const apiData = apiResponse.data;

    // Render the view with the API data
    res.render('result', { title: 'Result Page', apiData });
  } catch (error) {
    console.error('Error calling API:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = indexController;
