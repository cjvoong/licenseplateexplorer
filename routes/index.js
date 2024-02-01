const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

// Render the form
router.get('/', indexController.renderForm);

// Handle form submission and make the API call
router.post('/submit-form', indexController.submitForm);

module.exports = router;
