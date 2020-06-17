const { Router } = require('express');
const { getUser, postUser } = require('../db/index');

const userRouter = Router();

userRouter.get('/:email', (req, res) => {
  getUser(req.params.email)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

userRouter.post('/add', (req, res) => {
  const profile = req.body;
  console.log(profile);
  postUser(profile)
    .then(() => {
      res.send('User added to DB');
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

module.exports = {
  userRouter,
};
