const express = require('express');
const passport = require('passport');
const { AuthRouter } = require('./AuthRouter');
const { UserRouter } = require('./UserRouter');
const { GeocodeRouter } = require('./GeocodeRouter');

const routerV1 = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', AuthRouter);
  router.use('/user', passport.authenticate('jwt', { session: false }), UserRouter);
  router.use('/geocode', passport.authenticate('jwt', { session: false }), GeocodeRouter);
};

module.exports = { routerV1 };