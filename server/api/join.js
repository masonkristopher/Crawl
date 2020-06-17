const { Router } = require('express');
const { locationCrawl } = require('../db/index');

const joinRouter = Router();

// insert into location_crawl schema
joinRouter.post('/:locCrawl', (req, res) => {
  const locCrawl = req.params.locCrawl.split("+");
  const loc = locCrawl[0];
  const crawl = locCrawl[1];
  locationCrawl(loc, crawl)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// insert into user_crawl schema

module.exports = {
  joinRouter,
};
