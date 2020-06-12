const { Router } = require('express');
const { testRouter } = require('./test');
const { userRouter } = require('./user');


const apiRouter = Router();

apiRouter.use('/test', testRouter);
apiRouter.use('/user', userRouter);


module.exports.apiRouter = apiRouter;
