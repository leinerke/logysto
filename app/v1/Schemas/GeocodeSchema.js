const Joi = require('joi');

const geocode = {
  address: Joi.string(),
};

const GeocodeGetSchema = Joi.object({
  address: geocode.address.required(),
});

module.exports = {
  GeocodeSchema: {
    get: GeocodeGetSchema,
  },
};