const axios = require('axios');

const getStarWars = async (req, res) => {
  const response = await axios.get('https://swapi.dev/api/people');
  res.json(response.data.results)
}

module.exports = {
  getStarWars
}