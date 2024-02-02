const express = require('express');
const path = require('path');
const dbService = require('./service/DbService');
require('dotenv').config();

const app = express();
const port = 3000;

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const mongoURI = 'mongodb://' + username + ':' + password + '@localhost:27017/licenseplate?authSource=admin';

console.log(mongoURI);

dbService.connectToDatabase(mongoURI);

// Set up middleware, including static file serving and body parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine (EJS in this example)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define routes
const indexRoute = require('./routes/index');

app.use('/', indexRoute);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
