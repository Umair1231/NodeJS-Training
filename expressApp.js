const express = require('express');
const axios = require('axios')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


app.listen(3000)

app.get('/', async (req, res) => {
  const response = await axios.get('https://swapi.dev/api/people');
  res.json(response.data.results)
})