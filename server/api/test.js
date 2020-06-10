const { Router } = require('express');
const { test } = require('../db');

const testRouter = Router();

testRouter.get('/test', (req, res) => {
  test()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = {
  testRouter,
};
