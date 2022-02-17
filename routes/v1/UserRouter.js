const express = require('express');
const { UserController } = require('../../app/v1/Controllers/UserController');
const { UserSchema } = require('../../app/v1/Schemas/UserSchema');
const { validatorHandler } = require('../../middleware/validator');
const UserRouter = express.Router();

/**
 * Routes
 */
UserRouter.get('/', UserController.index);
UserRouter.post('/', validatorHandler(UserSchema.create, 'body'), UserController.store);
UserRouter.get('/:id', validatorHandler(UserSchema.get, 'params'), UserController.show);
UserRouter.put('/:id', validatorHandler(UserSchema.update, 'body'), UserController.update);
UserRouter.delete('/:id', validatorHandler(UserSchema.delete, 'params'), UserController.destroy);

module.exports = { UserRouter };