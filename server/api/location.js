const { Router } = require('express');
const { getLocation, postLocations } = require('../db/index');

const locationRouter = Router();

locationRouter.get('/:latLon', (req, res) => {
  const latLon = req.params.latLon.split('+');
  const lat = latLon[0];
  const lon = latLon[1];
  getLocation(lat, lon)
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