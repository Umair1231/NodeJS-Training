const express = require('express')
const router = express.Router();
const starWarsController = require('../controllers/StarWarsController');

router.get('/', starWarsController.getStarWars)

router.get('/:id', starWarsController.getOneStarWars)

router.post('/', starWarsController.postStarWars)

router.put('/:id', starWarsController.putStarWars)

router.delete('/:id', starWarsController.deleteStarWars)


module.exports = router