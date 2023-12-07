const express = require('express')
const router = express.Router();
const starWarsController = require('../controllers/StarWarsController');

router.get('/', starWarsController.getStarWars)

router.get('/:name', starWarsController.getOneStarWars)

router.post('/', starWarsController.postStarWars)

router.put('/:name', starWarsController.putStarWars)

router.delete('/:name', starWarsController.deleteStarWars)


module.exports = router