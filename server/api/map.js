const axios = require('axios');
const { Router } = require('express');
const { getCrawl } = require('../db/index');

const mapRouter = Router();

mapRouter.get('/', (req, res) => {
  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
    // comment for pr
    params: {
      location: '29.9713935,-90.1001093',
      radius: '4000',
      type: 'bar',
      keyword: 'bars',
      key: process.env.VUE_APP_GOOGLE_MAP_KEY,
    },
  })
    .then((data) => {
      res.send(data.data.results);
    })
    .catch((err) => {
      console.log('Error retrieving crawls from DB:', err);
      res.send(err);
    });
});

module.exports = {
  mapRouter,
};
