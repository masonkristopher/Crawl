const { Router } = require('express');
const {
  getCrawl,
  postCrawl,
  getOneCrawl,
  getJoinedCrawls,
  getUsersCrawls,
  joinCrawl,
} = require('../db/index');

const crawlRouter = Router();

crawlRouter.get('/one/:idCreator', (req, res) => {
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

crawlRouter.get('/all/:idCreator', (req, res) => {
  console.log(req.params.idCreator);
  getUsersCrawls(req.params.idCreator)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('Error retrieving crawls from DB:', err);
      res.send(err);
    });
});

crawlRouter.get('/all/:idCreator', (req, res) => {
  console.log(req.params.idCreator);
  getUsersCrawls(req.params.idCreator)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('Error retrieving crawls from DB:', err);
      res.send(err);
    });
});

crawlRouter.get('/details/:id', (req, res) => {
  console.log(req.params.id);
  getOneCrawl(req.params.id)
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

crawlRouter.post('/join/:crawlId/:userId', (req, res) => {
  const { crawlId, userId } = req.params;
  joinCrawl(userId, crawlId)
    .then(() => {
      res.send(`joined crawl as ${userId}`);
    })
    .catch((error) => {
      console.log('Error joining user into crawl in DB:', error);
    });
});

crawlRouter.get('/joined/:userId', (req, res) => {
  getJoinedCrawls(req.params.userId)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = {
  crawlRouter,
};
