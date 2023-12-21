const express = require('express')
const router = express.Router();
const starWarsController = require('../controllers/StarWarsController');
const passport = require('passport');

router.get('/',passport.authenticate('jwt', { session: false }), starWarsController.getStarWars)

router.get('/:id', starWarsController.getOneStarWars)

router.post('/', passport.authenticate('jwt', { session: false }), starWarsController.upload.single('image') , starWarsController.postStarWars)

router.put('/:id', starWarsController.putStarWars)

router.delete('/:id', passport.authenticate('jwt', { session: false }), starWarsController.deleteStarWars)


module.exports = router