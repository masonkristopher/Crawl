const { Router } = require('express');
const { testRouter } = require('./test');

const apiRouter = Router();

apiRouter.use('/test', testRouter);

module.exports.apiRouter = apiRouter;
