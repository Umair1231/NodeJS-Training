const express = require('express')
const router = express.Router();
const starWarsController = require('../controllers/StarWarsController');

router.get('/', starWarsController.getStarWars)


module.exports = router