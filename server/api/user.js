const { Router } = require('express');
const { getUser, postUser, updateUserLoc, getCrawlsUsers } = require('../db/index');

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

userRouter.get('/crawlId/:crawlId', (req, res) => {
  const { crawlId } = req.params;
  getCrawlsUsers(crawlId)
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

userRouter.put('/:idUser', (req, res) => {
  const location = req.body;
  const idUser = req.params.idUser;
  updateUserLoc(location, idUser)
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
