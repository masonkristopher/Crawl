const { Router } = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('../passport-setup.js');

const authRouter = Router();

// trying to utilize this cookie session middleware
// https://www.npmjs.com/package/cookie-session
authRouter.use(cookieSession({
  name: 'crawl-session',
  keys: ['key1', 'key2'],
}));


// use the two helper funcitons initialize and session
// http://www.passportjs.org/docs/configure
authRouter.use(passport.initialize());
authRouter.use(passport.session());


// a possible route to for the user to go to I used before just directing them to the homepage
authRouter.get('/google/good', (req, res) => {
  res.send(`Welcome ${req}`);
});


// this route will grab the profile and the email from google
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// this is the route called after a user clicks their sign in information
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: 'failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


// this is a possible you are not logged in route
authRouter.get('/google/notLoggedIn', (req, res) => res.send('You are not logged in'));

// this is a possible failed to log in route
authRouter.get('/google/failed', (req, res) => res.send('You failed to log in'));

// this is a possible logout route
authRouter.get('/google/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('notLoggedIn');
});


module.exports = {
  authRouter,
};
