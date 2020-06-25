const axios = require('axios');
const { Router } = require('express');

const mapRouter = Router();

mapRouter.get('/:place', (req, res) => {
  const { place } = req.params;
  console.log(req.params);
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: place,
      key: process.env.VUE_APP_GOOGLE_MAP_KEY,
    },
  })
    .then((response) => {
      console.log(response);
      const { lat, lng } = response.data.results[0].geometry.location;
      return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${lat},${lng}`,
          radius: '4000',
          type: 'bar',
          keyword: 'bars',
          key: process.env.VUE_APP_GOOGLE_MAP_KEY,
        },
      });
    })
    .then((data) => {
      res.send(data.data.results);
    })
    .catch((err) => {
      console.log('error populating map', err);
      res.status(500).end(err);
    });
});
mapRouter.get('/', (req, res) => {
  console.log('places route is hit');
  const { lat, lng } = req.query;
  console.log(req.query);
  return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
    params: {
      location: `${lat},${lng}`,
      radius: '4000',
      type: 'bar',
      keyword: 'bars',
      key: process.env.VUE_APP_GOOGLE_MAP_KEY,
    },
  })
    .then((data) => {
      res.send(data.data.results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = {
  mapRouter,
};
