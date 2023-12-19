const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
  const jwtOptions = {
    secretOrKey: 'yourSecretKey', // Replace 'yourSecretKey' with your actual secret key
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const jwtAuthenticate = async (payload, done) => {
    try {
      const user = await getUserById(payload.sub);
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  };


  passport.use(new JwtStrategy(jwtOptions, jwtAuthenticate));
}

module.exports = initialize;
