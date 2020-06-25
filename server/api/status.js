const { Router } = require('express');
const { getLocationOfCrawl, postCrawlStatus, flipVote } = require('../db/index');

const statusRouter = Router();

// statusRouter.get('/', (req, res) => {
//   console.log('hit status get route', req, res);
// });

// advance crawl status and return the location of the next bar
statusRouter.post('/change/:idCrawl', (req, res) => {
  console.log('hit /status/change/:idCrawl', req);
  const { idCrawl } = req.params;
  return postCrawlStatus(idCrawl)
    .then(() => {
      return getLocationOfCrawl(idCrawl);
    })
    .then((location) => {
      console.log(location);
      res.send(location);
    })
    .catch(err => console.error(err));
});

// post a vote, then count the votes
statusRouter.post('/vote/:idCrawl/:idUser', (req, res) => {
  console.log('hit /status/vote/:idCrawl/:idUser');
  const { idCrawl, idUser } = req.params;
  return flipVote(idUser)
    .then(() => {
      return countVotes(idCrawl);
    })
    .then((votes) => {

      res.send();
    })
    .catch(err => console.error(err));
});

module.exports = {
  statusRouter,
};
