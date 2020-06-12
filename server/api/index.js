const { Router } = require('express');
const { testRouter } = require('./test');
const { userRouter } = require('./user');
const { crawlRouter } = require('./crawl');
// const { locationRouter } = require('./location');


const apiRouter = Router();

apiRouter.use('/test', testRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/crawl', crawlRouter);
// apiRouter.use('./location', locationRouter);


module.exports.apiRouter = apiRouter;
