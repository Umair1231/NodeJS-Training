const express = require('express')
const router = express.Router();
const AuthController = require('../controllers/AuthController')
const passport = require('passport')


router.post('/login', AuthController.checkNotAuthenticated, AuthController.userLogin)

router.post('/register', AuthController.checkNotAuthenticated, AuthController.registerUser)

router.delete('/logout', AuthController.userLogout)


module.exports = router