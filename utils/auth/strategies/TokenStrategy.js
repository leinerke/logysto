const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config');

const JwtStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.app.ACCESS_TOKEN_SECRET,
}, async (payload, done) => (done(null, payload)));

module.exports = { JwtStrategy };