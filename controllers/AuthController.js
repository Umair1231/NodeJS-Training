const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken');


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

const userLogin = async (req, res) => {
 try
 {
   const loginUser = await User.findOne( { email: req.body.formData.email });
   if(!loginUser)
   {
    return res.status(404).json( { message: "User not found" } )
   }
   if(await bcrypt.compare(req.body.formData.password, loginUser.password))
   {
    const accessToken = jwt.sign({ sub: loginUser.email }, 'yourSecretKey', {
      expiresIn: 3600,
    });
    res.cookie('AccessToken', accessToken, {
      secure: false,
      maxAge: 3600000,
      Path: '/'
    });
    return res.status(201).json({message: "Login succesful"})
   }
   else
   {
    return res.status(401).json({message: "Wrong Password"})
   }
 }
 catch(err)
 {
  console.log(err)
  return res.status(500).json({message: "Internal server error"})
 }
}

const userLogout = async (req,res) => {
  try
  {
    res.clearCookie('AccessToken');
    return res.status(201).json({message: "Logout succesful"})
  }
  catch(error)
  {
    console.error(error)
    return res.status(500).json({message: "Internal server error"})
  }
}

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }

//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next()
// }


module.exports = {
  registerUser,
  userLogout,
  initializePassport,
  userLogin
}