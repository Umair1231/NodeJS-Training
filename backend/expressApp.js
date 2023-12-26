const express = require('express');
const axios = require('axios')
const cors = require('cors');
const mongoose = require('mongoose');
const constants = require('./Constants')
const fs = require('fs');
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
require("dotenv").config();


//create express app
const app = express();

mongoose.connect(process.env.MONGODB_CONNECT_URI)

const db = mongoose.connection

db.on('error', (error) => console.log(error))

//middleware for parsing JSON
app.use(express.json());

//allowing for API calls from frontend
app.use(cors({ origin: constants.FRONTEND_IP, credentials: true }));

app.use(passport.initialize())

app.use(cookieParser())


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


//listening for requests on port 3000
const serv = app.listen(constants.PORT_NUMBER)

module.exports = {
  serv
}