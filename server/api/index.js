const { Router } = require('express');
const { testRouter } = require('./test');
const { userRouter } = require('./user');
const { crawlRouter } = require('./crawl');
const { authRouter } = require('./auth');
const { locationRouter } = require('./location');
const { joinRouter } = require('./join');


const apiRouter = Router();

apiRouter.use('/test', testRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/crawl', crawlRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/location', locationRouter);
apiRouter.use('/join', joinRouter);


module.exports.apiRouter = apiRouter;
