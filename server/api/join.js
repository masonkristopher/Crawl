const { Router } = require('express');
const { locationCrawl, userCrawl } = require('../db/index');

const joinRouter = Router();

// insert into location_crawl schema
joinRouter.post('/lc/:locCrawl', (req, res) => {
  const locCrawl = req.params.locCrawl.split('+');
  const loc = locCrawl[0];
  const crawl = locCrawl[1];
  const order = locCrawl[2];
  locationCrawl(loc, crawl, order)
    .then((data) => {
      // console.log('locCrawl added');
      res.send(data);
    })
    .catch((err) => {
      // console.log('locCrawl not added', err);
      res.status(500).end();
    });
});

// insert into user_crawl schema
joinRouter.post('/uc/:userCrawl', (req, res) => {
  const ids = req.params.userCrawl.split('+');
  const idUser = ids[0];
  const idCrawl = ids[1];
  userCrawl(idUser, idCrawl)
    .then((data) => {
      // console.log('userCrawl added');
      res.send(data);
    })
    .catch((err) => {
      // console.log('userCrawl not added', err);
      res.status(500).end();
    });
});

module.exports = {
  joinRouter,
};
