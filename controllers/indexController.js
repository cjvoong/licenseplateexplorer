const axios = require('axios');
require('dotenv').config();
const dbService = require('../service/DbService');
const apiService = require('../service/ApiService');

const ApiResponse = dbService.getApiResponseModel();

const indexController = {};

indexController.renderForm = (req, res) => {
  // Render the form view
  res.render('form', { title: 'Search for your license plate' });
};

indexController.submitForm = async (req, res) => {
  // Retrieve data from the form submission
  const registrationNumber = req.body.registrationNumber;

  // Query MongoDB for the registration
  const existingApiResponse = await ApiResponse.findOne({ registrationNumber });

  if (existingApiResponse) {
    console.log("Found in db just gonna return that")
    // Registration already exists in the database, redirect to the view
    res.render('result', { title: 'Result Page', apiData: existingApiResponse });
  } else {
    console.log("Couldn't find in db, gonna call the API");
    // Registration not found, call the API and save to MongoDB
    try {
      //else call the API and save the registration for next time
      const headers = {
        'x-api-key': process.env.API_KEY,
        'Content-Type': 'application/json',
        // Add any other headers as needed
      };

      const apiResponse = await apiService.callExternalApi(
        'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
        { registrationNumber },
        {
          'x-api-key': process.env.API_KEY,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        }
      );
  

      // Extract relevant data from the API response
      const apiData = apiResponse.data;
      const newApiResponse = new ApiResponse(apiData);
      await newApiResponse.save(); //save to mongo

      // Render the view with the API data
      res.render('result', { title: 'Result Page', apiData });
    } catch (error) {
      if (error.isAxiosError) {
        // Axios error (API call error)
        res.status(500).send('Error calling external API');
      } else if (error.name === 'MongoError') {
        // MongoDB error
        res.status(500).send('Error with MongoDB');
      } else {
        // Other types of errors
        res.status(500).send('Internal Server Error');
      }
    }
  }
};

//list all the registrations in the db
indexController.list = async (req, res) => {
  try {
    // Query MongoDB to retrieve all registrations
    const allRegistrations = await ApiResponse.find();

    // Render the view with the list of registrations
    res.render('list', { title: 'All Registrations', registrations: allRegistrations });
  } catch (error) {
    console.error('Error retrieving registrations:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

indexController.viewRegistration = async (req, res) => {
  try {
    // Extract the registration number from the request parameters
    const registrationNumber = req.params.registrationNumber;

    // Query MongoDB to retrieve the specific registration
    const registration = await ApiResponse.findOne({ registrationNumber });

    if (registration) {
      // Render the view with the details of the specific registration
      res.render('registrationDetails', { title: 'Registration Details', registration });
    } else {
      // Registration not found
      res.status(404).send('Registration not found');
    }
  } catch (error) {
    console.error('Error retrieving registration:', error.message);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = indexController;
