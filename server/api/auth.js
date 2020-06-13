const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.get('/failed', (req, res) => res.send('You failed to log in'));

authRouter.get('/good', (req, res) => res.send(`Welcome ${req.user.email}`));


authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));


authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/auth/good');
  });


module.exports = {
  authRouter,
};
