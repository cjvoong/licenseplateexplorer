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
  const registrationNumber = req.query.registrationNumber;
// Query MongoDB for the registration
  const existingApiResponse = await ApiResponse.findOne({ registrationNumber });

  if (existingApiResponse) {
    console.log("Found " + registrationNumber + " in db just gonna return that")
    // Registration already exists in the database, redirect to the view
    res.render('result', { title: 'Registration Details', apiData: existingApiResponse });
  } else {
    console.log("Couldn't find " + registrationNumber + " in db, gonna call the API");
    let apiResponse;
    // Registration not found, call the API and save to MongoDB
    try {
      //else call the API and save the registration for next time
      const headers = {
        'x-api-key': process.env.API_KEY,
        'Content-Type': 'application/json',
        // Add any other headers as needed
      };

      apiResponse = await apiService.callExternalApi(
        'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
        { registrationNumber },
        {
          'x-api-key': process.env.API_KEY,
          'Content-Type': 'application/json',
          // Add any other headers as needed
        }
      );
    } catch (error){
      res.status(500).send('Error calling external API');
      console.error(error);
    }
    try {
       // Extract relevant data from the API response
       const newApiResponse = new ApiResponse(apiResponse);
      await newApiResponse.save(); //save to mongo

      // Render the view with the API data
      res.render('result', { title: 'Registration Details', apiData:newApiResponse });
    } catch (error) {
        // MongoDB error
        res.status(500).send('Error with MongoDB');
        console.error(error);
    }
  }
};

module.exports = indexController;