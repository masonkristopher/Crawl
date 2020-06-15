const { Router } = require('express');
const { getLocation, postLocations } = require('../db/index');

const locationRouter = Router();

locationRouter.post('/add', (req, res) => {
  const location = req.body;
  postLocations(location)
    .then((data) => {
      console.log('Location added to database');
      res.send(data);
    })
    .catch((err) => {
      console.log('Location not added to database');
      res.send();
    });
});

module.exports = {
  locationRouter,
}