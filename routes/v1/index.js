const express = require('express');
const { UserRouter } = require('./UserRouter');

const routerV1 = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/user', UserRouter);
};

module.exports = { routerV1 };