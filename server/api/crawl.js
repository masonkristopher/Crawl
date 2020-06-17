const { Router } = require('express');
const { getCrawl, postCrawl } = require('../db/index');

const crawlRouter = Router();

crawlRouter.get('/:idCreator', (req, res) => {
  console.log(req.params.idCreator);
  getCrawl(req.params.idCreator)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('Error retrieving crawls from DB:', err);
      res.send(err);
    });
});

crawlRouter.post('/add', (req, res) => {
  const crawl = req.body;
  postCrawl(crawl)
    .then((data) => {
      console.log('Crawl added to DB');
      res.send(data);
    })
    .catch((err) => {
      console.log('Error adding crawl to DB:', err);
      res.end();
    });
});

module.exports = {
  crawlRouter,
};
