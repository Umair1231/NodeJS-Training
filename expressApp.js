const express = require('express');
const axios = require('axios')
const cors = require('cors');
// const starWarsRoute = require('./routes/StarWarsRoute');
const constants = require('../NodeJS-Training/Constants')
const fs = require('fs');

//create express app
const app = express();

//middleware for parsing JSON
app.use(express.json());

//allowing for API calls from frontend
app.use(cors({ origin: constants.FRONTEND_IP, credentials: true }));

//listening for requests on port 3000
app.listen(constants.PORT_NUMBER)

fs.readdir('./routes/', (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('Route.js')) {
      const routeName = '/' + file.substring(0, file.indexOf('Route')).toLowerCase();
      const completeName = file.replace('.js', '');
      const routeFunction = require(`./routes/${completeName}`);

      if (typeof routeFunction === 'function') {
        app.use(routeName, routeFunction);
      } else {
        console.error(`Route file '${completeName}' does not export a valid function.`);
      }
    }
  });
});


//Star Wars routes
// app.use('/', starWarsRoute)
