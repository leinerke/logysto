const axios = require('axios');
const boom = require('@hapi/boom');
const { config } = require('../../../config');

class GeocodeController {
  static async get(req, res, next) {
    try {
      const geocode = await GeocodeController.providers(req.query.address);
      if (!geocode) throw boom.notFound();
      res.json(geocode);
    } catch (e) {
      next(e);
    }
  }

  static async providers(address) {
    let data = await GeocodeController.googleProvider(address);
    if (!data) data = await GeocodeController.tomtomProvider(address);
    return data;
  }

  static async googleProvider(address) {
    try {
      const url = config.geo.google.URL;
      const key = config.geo.google.KEY;
      const { data } = await axios.get(url, { params: { key, address } });
      return (data.results.length)
        ? data.results
        : false;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  static async tomtomProvider(address) {
    try {
      const url = config.geo.tomtom.URL;
      const key = config.geo.tomtom.KEY;
      const { data } = await axios.get(`${url}${encodeURIComponent(address)}.json`, { params: { key } });
      return (data.results.length)
        ? data.results
        : false;
    } catch (e) {
      throw boom.badRequest(e);
    }
  }
}

module.exports = { GeocodeController };