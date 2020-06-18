const { Router } = require('express');
const { getLocation, postLocations } = require('../db/index');

const locationRouter = Router();

locationRouter.get('/:name', (req, res) => {
  const name = req.params.name;
  // const latLng = req.params.latLng.split('+');
  // const lat = latLng[0];
  // const lng = latLng[1];
  getLocation(name)
    .then((data) => {
      console.log('location retrieved');
      res.send(data);
    })
    .catch((err) => {
      console.log('Error retrieving crawls from DB:', err);
      res.status(500).end();
    });
});

locationRouter.post('/add', (req, res) => {
  const location = req.body;
  postLocations(location)
    .then((data) => {
      console.log('Location added to database');
      res.send(data);
    })
    .catch((err) => {
      console.log('Location not added to database');
      res.status(500).end();
    });
});

module.exports = {
  locationRouter,
}