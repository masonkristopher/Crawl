const { Router } = require('express');
const { getCrawl, postCrawl } = require('../db/index');

const crawlRouter = Router();

crawlRouter.get('/:idCreator', (req, res) => {
  console.log(req.params.email);
  getCrawl(req.params.email)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

crawlRouter.post('/add', (req, res) => {
  const crawl = req.body;
  console.log(crawl);
  postCrawl(crawl)
    .then(() => {
      res.send('Crawl added to DB');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = {
  crawlRouter,
};
