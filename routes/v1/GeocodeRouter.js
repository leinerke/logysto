const express = require('express');
const { GeocodeController } = require('../../app/v1/Controllers/GeocodeController');
const { validatorHandler } = require('../../middleware/validator');
const { GeocodeSchema } = require('../../app/v1/Schemas/GeocodeSchema');
const GeocodeRouter = express.Router();

/**
 * Routes
 */
GeocodeRouter.get('/', validatorHandler(GeocodeSchema.get, 'query'), GeocodeController.get);

module.exports = { GeocodeRouter };