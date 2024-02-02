// ApiResponseModel.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true },
  taxStatus: { type: String, required: true },
  taxDueDate: { type: Date },
  motStatus: { type: String, required: true },
  make: { type: String },
  yearOfManufacture: { type: Number },
  engineCapacity: { type: Number },
  co2Emissions: { type: Number },
  fuelType: { type: String },
  markedForExport: { type: Boolean },
  colour: { type: String },
  typeApproval: { type: String },
  dateOfLastV5CIssued: { type: Date },
  motExpiryDate: { type: Date },
  wheelplan: { type: String },
  monthOfFirstRegistration: { type: Date },
});

const Registrations = mongoose.model('Registrations', registrationSchema);

module.exports = Registrations;
