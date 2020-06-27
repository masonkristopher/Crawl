/* eslint-disable camelcase */
const { Router } = require('express');
const {
  getLocationOfCrawl,
  changeCrawlStatus,
  getCrawlStatusNum,
  // flipVote,
  // countVotes,
  // getVote,
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

// get all move on votes for a crawl
// statusRouter.get('/votes/:idCrawl', (req, res) => {
//   console.log('GET /status/votes/:idCrawl');
//   const { idCrawl } = req.params;
//   return countVotes(idCrawl)
//     .then((votes) => {
//       console.log('votes', votes);
//       res.send(votes);
//     });
// });

// get the vote of a user
// statusRouter.get('/vote/:idUser', (req, res) => {
//   console.log('GET /status/vote/:idUser');
//   const { idUser } = req.params;
//   return getVote(idUser)
//     .then(vote => {
//       console.log('vote', vote);
//       res.send(vote);
//     })
//     .catch(err => console.error(err));
// });

// post a vote for a crawl, then count the votes for a crawl
// statusRouter.post('/vote/:idUser/:idCrawl', (req, res) => {
//   console.log('POST /status/vote/:idUser/:idCrawl');
//   const { idUser, idCrawl } = req.params;
//   return flipVote(idUser)
//     .then(() => {
//       return countVotes(idCrawl);
//     })
//     .then((votes) => {
//       console.log('votes', votes);
//       res.send(votes);
//     })
//     .catch(err => console.error(err));
// });

module.exports = {
  statusRouter,
};
