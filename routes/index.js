const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

// Render the form
router.get('/', indexController.renderForm);
// Handle form submission and make the API call
router.get('/list',indexController.list)
router.get('/view', indexController.viewRegistration);

module.exports = router;
