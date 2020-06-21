const { Router } = require('express');
const { getUser, postUser, updateUserLoc } = require('../db/index');

const userRouter = Router();

userRouter.get('/:email', (req, res) => {
  console.log(req.params.email);
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
      res.status().end();
    });
});

userRouter.put('/', (req, res) => {
  const location = req.body;
  updateUserLoc(location)
    .then(() => {
      res.send('User location updated');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});


module.exports = {
  userRouter,
};
