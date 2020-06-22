const { Router } = require('express');
const { getLocation, postLocations, getLocsInCrawl } = require('../db/index');

const locationRouter = Router();

locationRouter.get('/:name', (req, res) => {
  const name = req.params.name;
  getLocation(name)
    .then((data) => {
      console.log('location retrieved');
      res.send(data);
    })
    .catch((err) => {
      console.log('Error retrieving crawl from DB:', err);
      res.status(500).end();
    });
});

locationRouter.get('/all/:crawlId', (req, res) => {
  const crawlId = req.params.crawlId;
  getLocsInCrawl(crawlId)
    .then((data) => {
      console.log('locations retrieved');
      res.send(data);
    })
    .catch((err) => {
      console.log('Error retrieving crawls from DB:', err);
      res.status(500).end();
    });
});

locationRouter.get('/all/:crawlId', (req, res) => {
  const { crawlId } = req.params;
  getLocsInCrawl(crawlId)
    .then((data) => {
      console.log('locations retrieved');
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
};
