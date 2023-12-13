const axios = require('axios');
const constants = require('../Constants');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User')

const initializePassport = require('../passport-config')
initializePassport(
  passport,
  async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const registerUser = async (req,res) => {
  try
  {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    await newUser.save()
    res.status(201).json( { message: "User registered" } )
  }
  catch(err)
  {
    res.status(500).json( { message: "Server Error" } )
  }
}

const userLogin = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    try
    {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: 'Logged in successfully' });
      });
    }
    catch(err)
    {
      return res.status(500).json({ message: err.message });
    }
  })(req,res,next)
}

const userLogout = async (req,res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  });
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


module.exports = {
  registerUser,
  checkAuthenticated,
  checkNotAuthenticated,
  userLogout,
  initializePassport,
  userLogin
}