const express = require('express');
const { AuthRouter } = require('./AuthRouter');
const { UserRouter } = require('./UserRouter');
const passport = require('passport');

const routerV1 = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', AuthRouter);
  router.use('/user', passport.authenticate('jwt', { session: false }), UserRouter);
};

module.exports = { routerV1 };