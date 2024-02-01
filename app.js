const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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
