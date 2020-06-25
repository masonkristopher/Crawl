/* eslint-disable camelcase */
const { Router } = require('express');
const {
  getLocationOfCrawl,
  changeCrawlStatus,
  getCrawlStatusNum,
  // flipVote,
} = require('../db/index');

const statusRouter = Router();

// get location of crawl without changing status
statusRouter.get('/:idCrawl', (req, res) => {
  const { idCrawl } = req.params;
  return getCrawlStatusNum(idCrawl)
    .then(([{ Crawl_Status }]) => {
      if (Crawl_Status === '0') {
        res.send('Not Started!');
      } else {
        getLocationOfCrawl(idCrawl)
          .then((location) => {
            if (location.length) {
              const [{ Name }] = location;
              res.send(Name);
            } else {
              res.send('');
            }
          });
      }
    })
    .catch(err => console.error(err));
});

// advance crawl status and return the location of the next bar
statusRouter.post('/change/:idCrawl', (req, res) => {
  const { idCrawl } = req.params;
  return changeCrawlStatus(idCrawl)
    .then(() => getLocationOfCrawl(idCrawl))
    .then((location) => {
      if (location.length) {
        const [{ Name }] = location;
        res.send(Name);
      } else {
        res.send('');
      }
    })
    .catch(err => console.error(err));
});

// post a vote, then count the votes
// statusRouter.post('/vote/:idCrawl/:idUser', (req, res) => {
//   console.log('hit /status/vote/:idCrawl/:idUser');
//   const { idCrawl, idUser } = req.params;
//   return flipVote(idUser)
//     .then(() => {
//       return countVotes(idCrawl);
//     })
//     .then((votes) => {

//       res.send();
//     })
//     .catch(err => console.error(err));
// });

module.exports = {
  statusRouter,
};
