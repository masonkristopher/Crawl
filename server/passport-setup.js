const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config({ path: '../.env' });


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://www.example.com/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      googleId: profile.id
    }, function (err, user) {
      return done(err, user);
    });
  }
));



