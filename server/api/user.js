const { Router } = require('express');
const { getUser, postUser, updateContact, updateUserLoc  } = require('../db/index');

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
      res.status().end();
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
