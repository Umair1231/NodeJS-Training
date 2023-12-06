const express = require('express');
const axios = require('axios')
const cors = require('cors');
const starWarsRoutes = require('./routes/StarWarsRoute');

//create express app
const app = express();

//middleware for parsing JSON
app.use(express.json());

//allowing for API calls from frontend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//listening for requests on port 3000
app.listen(3000)

//Star Wars routes
app.use('/', starWarsRoutes)

app.get('/', async (req, res) => {
  const response = await axios.get('https://swapi.dev/api/people');
  res.json(response.data.results)
})