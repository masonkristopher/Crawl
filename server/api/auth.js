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

// make it possible to check if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    console.log('user is logged in');
    next();
  } else {
    console.log('user not logged in');
    res.redirect('/api/auth/google');
  }
};


// use the two helper funcitons initialize and session
// http://www.passportjs.org/docs/configure
authRouter.use(passport.initialize());
authRouter.use(passport.session());


// a possible route to for the user to go to I used before just directing them to the homepage
authRouter.get('/google/good', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

// this may be the main log in route from the main.js
authRouter.get('/google/login', (req, res) => {
  if (req.user) {
    const data = {
      redirect: '/',
      userId: req.user.id,
      user: req.user.displayName,
      email: req.user.emails[0].value,
      image: req.user.photos[0].value,
    };
    return res.send(data);
  }
  const data = { redirect: '/login' };
  return res.send(data);
});

// this route will grab the profile and the email from google
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// this is the route called after a user clicks their sign in information
authRouter.get('/google/callback', passport.authenticate('google', { scope: ['profile', 'email'], failureRedirect: 'failed' }),
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
  // when redirecting to notLoggedIn, it said 'net::ERR_CONNECTION_CLOSED', so just send the reponse here
  // res.redirect('notLoggedIn');
  res.send('not logged in');
});


module.exports = {
  authRouter,
};
