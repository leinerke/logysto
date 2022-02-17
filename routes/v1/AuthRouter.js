const express = require('express');
const { AuthController } = require('../../app/v1/Controllers/AuthController');
const { AuthSchema } = require('../../app/v1/Schemas/AuthSchema');
const { validatorHandler } = require('../../middleware/validator');
const passport = require('passport');
const AuthRouter = express.Router();

/**
 * Routes
 */
AuthRouter.post('/register', validatorHandler(AuthSchema.register, 'body'), AuthController.register);
AuthRouter.post('/login',
  validatorHandler(AuthSchema.login, 'body'),
  passport.authenticate('local', { session: false }),
  AuthController.login,
);
AuthRouter.post('/refresh',
  validatorHandler(AuthSchema.refresh, 'body'),
  AuthController.refresh,
);

module.exports = { AuthRouter };