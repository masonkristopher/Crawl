const { Router } = require('express');
const {
  getCrawl,
  postCrawl,
  getOneCrawl,
  getJoinedCrawls,
  getUsersCrawls,
  joinCrawl,
  getCrawlsUsers,
} = require('../db/index');

const crawlRouter = Router();

crawlRouter.get('/one/:idCreator', (req, res) => {
  const { idCreator } = req.params;
  getCrawl(idCreator)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).end();
    });
});

crawlRouter.get('/all/:idCreator', (req, res) => {
  const { idCreator } = req.params;
  getUsersCrawls(idCreator)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      // console.log('Error retrieving crawls from DB:', err);
      res.status(500).end();
    });
});

crawlRouter.get('/details/:id', (req, res) => {
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
  crawl.title = crawl.title || 'Untitled Crawl';
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
  // get users crawls to check if user has already joined this one
  getUsersCrawls(userId)
    .then((data) => {
      let alreadyJoined = false;
      // loop through their crawls
      data.forEach(crawl => {
        const crawlIdNumber = parseFloat(crawlId);
        // check for match
        if (crawl.Id_Crawl === crawlIdNumber) {
          alreadyJoined = true;
        }
      });
      // if already, end the req
      if (alreadyJoined) {
        res.send(`user ${userId} already joined ${crawlId}`);
      } else {
        // otherwise, add to the crawl
        joinCrawl(userId, crawlId)
          .then(() => {
            res.send(`joined crawl as ${userId}`);
          })
          .catch((error) => {
            console.log('Error joining user into crawl in DB:', error);
          });
      }
    })
    .catch((err) => console.error(err));
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

crawlRouter.get('/joined/by/:crawlId', (req, res) => {
  getCrawlsUsers(req.params.crawlId)
    .then(data => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = {
  crawlRouter,
};
