const { Router } = require('express');
const { getUser, postUser, updateContact } = require('../db/index');

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
  postUser(profile)
    .then(() => {
      res.send('User added to DB');
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

userRouter.post('/contact', (req, res) => {
  const { number, userId } = req.body;
  updateContact(number, userId)
  .then((dataRes) => {
    console.log(dataRes);
    res.send('Contact Number Updated');
    })
    .catch((err) => {
      console.log('Could not update phone number:', err);
    });
});

module.exports = {
  userRouter,
};
