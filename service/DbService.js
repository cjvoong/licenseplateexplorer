// dbService.js
const mongoose = require('mongoose');
const Registrations = require('../models/RegistrationSchema');

const connectToDatabase = async (mongoURI) => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
};

const getApiResponseModel = () => Registrations;

module.exports = {
  connectToDatabase,
  getApiResponseModel,
};
