const { Router } = require('express');
const { locationCrawl } = require('../db/index');

const joinRouter = Router();

// insert into location_crawl schema
joinRouter.post('/lc/:locCrawl', (req, res) => {
  const locCrawl = req.params.locCrawl.split('+');
  const loc = locCrawl[0];
  const crawl = locCrawl[1];
  const order = locCrawl[2];
  locationCrawl(loc, crawl, order)
    .then((data) => {
      console.log('locCrawl added');
      res.send(data);
    })
    .catch((err) => {
      console.log('locCrawl not added');
      res.status(500).end();
    });
});

// insert into user_crawl schema

module.exports = {
  joinRouter,
};
